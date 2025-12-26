import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StatsCardsComponent } from '../stats-cards/stats-cards';
import { ConversationListComponent } from '../conversation-list/conversation-list';
import { ConversationDetailComponent } from '../conversation-detail/conversation-detail';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatsCardsComponent,
    ConversationListComponent,
    ConversationDetailComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
  }

  getRoleBadgeColor(): string {
    const user = this.authService.currentUser();
    if (!user) return 'bg-gray-100 text-gray-700';

    switch (user.role) {
      case 'admin':
        return 'bg-primary-100 text-primary-700';
      case 'moderator':
        return 'bg-secondary-100 text-secondary-700';
      case 'viewer':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
