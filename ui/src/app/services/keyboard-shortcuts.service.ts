import { Injectable, signal, inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface KeyboardShortcut {
  key: string;
  modifiers?: ('ctrl' | 'meta' | 'shift' | 'alt')[];
  description: string;
  category: 'navigation' | 'actions' | 'view';
  action: () => void;
}

@Injectable({ providedIn: 'root' })
export class KeyboardShortcutsService {
  private document = inject(DOCUMENT);
  private ngZone = inject(NgZone);

  isHelpModalOpen = signal(false);
  private shortcuts: KeyboardShortcut[] = [];
  private enabled = signal(true);

  constructor() {
    this.setupGlobalListener();
  }

  private setupGlobalListener(): void {
    this.ngZone.runOutsideAngular(() => {
      this.document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (!this.enabled()) return;

        // Don't trigger shortcuts when typing in inputs
        const target = event.target as HTMLElement;
        if (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable
        ) {
          // Allow Escape to blur inputs
          if (event.key === 'Escape') {
            target.blur();
          }
          return;
        }

        this.ngZone.run(() => {
          this.handleKeydown(event);
        });
      });
    });
  }

  private handleKeydown(event: KeyboardEvent): void {
    // Help modal toggle
    if (event.key === '?' && event.shiftKey) {
      event.preventDefault();
      this.toggleHelpModal();
      return;
    }

    // Close modal on Escape
    if (event.key === 'Escape' && this.isHelpModalOpen()) {
      this.isHelpModalOpen.set(false);
      return;
    }

    // Check registered shortcuts
    for (const shortcut of this.shortcuts) {
      if (this.matchesShortcut(event, shortcut)) {
        event.preventDefault();
        shortcut.action();
        return;
      }
    }
  }

  private matchesShortcut(
    event: KeyboardEvent,
    shortcut: KeyboardShortcut
  ): boolean {
    const keyMatches =
      event.key.toLowerCase() === shortcut.key.toLowerCase() ||
      event.code === shortcut.key;

    if (!keyMatches) return false;

    const modifiers = shortcut.modifiers || [];
    const ctrlRequired = modifiers.includes('ctrl');
    const metaRequired = modifiers.includes('meta');
    const shiftRequired = modifiers.includes('shift');
    const altRequired = modifiers.includes('alt');

    // For Ctrl shortcuts, also accept Meta (Cmd on Mac)
    const ctrlOrMeta = event.ctrlKey || event.metaKey;
    const ctrlMatches = ctrlRequired || metaRequired ? ctrlOrMeta : !ctrlOrMeta;
    const shiftMatches = shiftRequired ? event.shiftKey : !event.shiftKey;
    const altMatches = altRequired ? event.altKey : !event.altKey;

    return ctrlMatches && shiftMatches && altMatches;
  }

  registerShortcut(shortcut: KeyboardShortcut): void {
    this.shortcuts.push(shortcut);
  }

  unregisterShortcut(key: string): void {
    this.shortcuts = this.shortcuts.filter((s) => s.key !== key);
  }

  toggleHelpModal(): void {
    this.isHelpModalOpen.update((open) => !open);
  }

  enable(): void {
    this.enabled.set(true);
  }

  disable(): void {
    this.enabled.set(false);
  }

  getShortcuts(): KeyboardShortcut[] {
    return [...this.shortcuts];
  }

  getShortcutsByCategory(): Record<string, KeyboardShortcut[]> {
    const categories: Record<string, KeyboardShortcut[]> = {
      navigation: [],
      actions: [],
      view: [],
    };

    for (const shortcut of this.shortcuts) {
      categories[shortcut.category].push(shortcut);
    }

    return categories;
  }

  formatShortcut(shortcut: KeyboardShortcut): string {
    const parts: string[] = [];
    const modifiers = shortcut.modifiers || [];

    if (modifiers.includes('ctrl') || modifiers.includes('meta')) {
      parts.push(this.isMac() ? 'Cmd' : 'Ctrl');
    }
    if (modifiers.includes('shift')) {
      parts.push('Shift');
    }
    if (modifiers.includes('alt')) {
      parts.push(this.isMac() ? 'Option' : 'Alt');
    }

    // Format the key nicely
    let keyDisplay = shortcut.key;
    if (shortcut.key === '/') keyDisplay = '/';
    else if (shortcut.key === 'Escape') keyDisplay = 'Esc';
    else keyDisplay = shortcut.key.toUpperCase();

    parts.push(keyDisplay);

    return parts.join(' + ');
  }

  private isMac(): boolean {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  }
}
