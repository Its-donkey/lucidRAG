import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { KeyboardShortcutsService } from '../../services/keyboard-shortcuts.service';
import { SearchService } from '../../services/search.service';
import { SidebarComponent } from '../layout/sidebar/sidebar';
import { ThemeToggleComponent } from '../shared/theme-toggle/theme-toggle';
import { StatsCardsComponent } from '../stats-cards/stats-cards';
import { ConversationListComponent } from '../conversation-list/conversation-list';
import { ConversationDetailComponent } from '../conversation-detail/conversation-detail';
import { KeyboardShortcutsModalComponent } from '../shared/keyboard-shortcuts-modal/keyboard-shortcuts-modal';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    ThemeToggleComponent,
    StatsCardsComponent,
    ConversationListComponent,
    ConversationDetailComponent,
    KeyboardShortcutsModalComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
  sidebarCollapsed = signal(false);

  private shortcutsService = inject(KeyboardShortcutsService);
  private searchService = inject(SearchService);

  constructor(
    public authService: AuthService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.registerShortcuts();
  }

  private registerShortcuts(): void {
    // Search shortcut
    this.shortcutsService.registerShortcut({
      key: '/',
      description: 'Focus search',
      category: 'navigation',
      action: () => {
        const searchInput = document.querySelector(
          '.search-bar input'
        ) as HTMLInputElement;
        searchInput?.focus();
      },
    });

    this.shortcutsService.registerShortcut({
      key: 'k',
      modifiers: ['ctrl'],
      description: 'Open search',
      category: 'navigation',
      action: () => {
        const searchInput = document.querySelector(
          '.search-bar input'
        ) as HTMLInputElement;
        searchInput?.focus();
      },
    });

    // Theme toggle
    this.shortcutsService.registerShortcut({
      key: 'd',
      modifiers: ['ctrl'],
      description: 'Toggle dark mode',
      category: 'view',
      action: () => {
        const currentTheme = this.themeService.resolvedTheme();
        this.themeService.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
      },
    });

    // Clear filters
    this.shortcutsService.registerShortcut({
      key: 'Escape',
      description: 'Clear search/filters',
      category: 'actions',
      action: () => {
        this.searchService.clearFilters();
      },
    });
  }
}
