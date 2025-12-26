import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.html',
})
export class ThemeToggleComponent {
  @Input() compact = false;

  constructor(public themeService: ThemeService) {}

  toggle(): void {
    this.themeService.toggleTheme();
  }
}
