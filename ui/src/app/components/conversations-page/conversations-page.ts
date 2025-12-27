import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../layout/sidebar/sidebar';
import { ThemeToggleComponent } from '../shared/theme-toggle/theme-toggle';
import { ConversationListComponent } from '../conversation-list/conversation-list';
import { ConversationDetailComponent } from '../conversation-detail/conversation-detail';
import { KeyboardShortcutsModalComponent } from '../shared/keyboard-shortcuts-modal/keyboard-shortcuts-modal';
import { MobileGestureService } from '../../services/mobile-gesture.service';

@Component({
  selector: 'app-conversations-page',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    ThemeToggleComponent,
    ConversationListComponent,
    ConversationDetailComponent,
    KeyboardShortcutsModalComponent,
  ],
  templateUrl: './conversations-page.html',
})
export class ConversationsPageComponent {
  private mobileGestureService = inject(MobileGestureService);
  sidebarCollapsed = signal(false);

  openSidebar(): void {
    this.mobileGestureService.openSidebar();
  }
}
