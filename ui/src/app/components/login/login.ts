import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.email() || !this.password()) {
      this.errorMessage.set('Please enter both email and password');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService
      .login({
        email: this.email(),
        password: this.password(),
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(error.error?.message || 'Invalid credentials');
        },
      });
  }

  useDemoCredentials(role: 'admin' | 'moderator' | 'viewer'): void {
    const demoCredentials = {
      admin: { email: 'admin@demo.com', password: 'admin123' },
      moderator: { email: 'mod@demo.com', password: 'mod123' },
      viewer: { email: 'viewer@demo.com', password: 'viewer123' },
    };

    this.email.set(demoCredentials[role].email);
    this.password.set(demoCredentials[role].password);
  }
}
