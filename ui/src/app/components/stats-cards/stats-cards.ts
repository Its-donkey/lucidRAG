import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardStats } from '../../models/stats.model';

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-cards.html',
  styleUrls: ['./stats-cards.scss'],
})
export class StatsCardsComponent implements OnInit {
  stats = signal<DashboardStats | null>(null);

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe({
      next: (data) => this.stats.set(data),
      error: () =>
        this.stats.set({
          totalConversations: 0,
          activeConversations: 0,
          averageResponseTime: 0,
          botEnabledCount: 0,
          platformStats: { whatsapp: 0, instagram: 0, telegram: 0, facebook: 0 },
          todayMessages: 0,
        }),
    });
  }
}
