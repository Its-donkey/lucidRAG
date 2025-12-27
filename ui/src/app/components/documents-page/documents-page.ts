import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../layout/sidebar/sidebar';
import { ThemeToggleComponent } from '../shared/theme-toggle/theme-toggle';
import { KeyboardShortcutsModalComponent } from '../shared/keyboard-shortcuts-modal/keyboard-shortcuts-modal';
import { MobileGestureService } from '../../services/mobile-gesture.service';

@Component({
  selector: 'app-documents-page',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    ThemeToggleComponent,
    KeyboardShortcutsModalComponent,
  ],
  templateUrl: './documents-page.html',
})
export class DocumentsPageComponent {
  private mobileGestureService = inject(MobileGestureService);
  sidebarCollapsed = signal(false);

  openSidebar(): void {
    this.mobileGestureService.openSidebar();
  }
}
