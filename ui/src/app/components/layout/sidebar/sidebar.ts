import { Component, signal, output, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle';
import { MobileGestureService } from '../../../services/mobile-gesture.service';

interface NavItem {
  route: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ThemeToggleComponent],
  templateUrl: './sidebar.html',
  host: {
    class: 'contents',
  },
})
export class SidebarComponent {
  private mobileGestureService = inject(MobileGestureService);

  isCollapsed = signal(false);

  // Sync with mobile gesture service
  get isMobileOpen() {
    return this.mobileGestureService.sidebarOpen;
  }

  collapseChange = output<boolean>();
  mobileClose = output<void>();

  navItems: NavItem[] = [
    { route: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { route: '/conversations', label: 'Conversations', icon: 'chat' },
    { route: '/documents', label: 'Documents', icon: 'document' },
  ];

  constructor(public authService: AuthService) {}

  toggleCollapse(): void {
    this.isCollapsed.update((v) => !v);
    this.collapseChange.emit(this.isCollapsed());
  }

  openMobile(): void {
    this.mobileGestureService.openSidebar();
  }

  closeMobile(): void {
    this.mobileGestureService.closeSidebar();
    this.mobileClose.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}
