import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  KeyboardShortcutsService,
  KeyboardShortcut,
} from '../../../services/keyboard-shortcuts.service';

@Component({
  selector: 'app-keyboard-shortcuts-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyboard-shortcuts-modal.html',
  styleUrls: ['./keyboard-shortcuts-modal.scss'],
  host: {
    class: 'contents',
  },
})
export class KeyboardShortcutsModalComponent {
  shortcutsService = inject(KeyboardShortcutsService);

  get isOpen(): boolean {
    return this.shortcutsService.isHelpModalOpen();
  }

  get shortcutsByCategory(): Record<string, KeyboardShortcut[]> {
    return this.shortcutsService.getShortcutsByCategory();
  }

  close(): void {
    this.shortcutsService.isHelpModalOpen.set(false);
  }

  formatShortcut(shortcut: KeyboardShortcut): string {
    return this.shortcutsService.formatShortcut(shortcut);
  }

  getCategoryTitle(category: string): string {
    const titles: Record<string, string> = {
      navigation: 'Navigation',
      actions: 'Actions',
      view: 'View',
    };
    return titles[category] || category;
  }

  hasShortcuts(category: string): boolean {
    return this.shortcutsByCategory[category]?.length > 0;
  }
}
