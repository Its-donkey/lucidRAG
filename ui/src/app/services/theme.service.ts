import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'lucidrag_theme';

  currentTheme = signal<Theme>('system');
  resolvedTheme = signal<'light' | 'dark'>('light');

  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    // Load saved preference
    const saved = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      this.currentTheme.set(saved);
    }

    // Apply initial theme
    this.applyTheme(this.currentTheme());

    // Listen for system theme changes
    this.mediaQuery.addEventListener('change', () => {
      if (this.currentTheme() === 'system') {
        this.applyTheme('system');
      }
    });

    // Effect to apply theme when it changes
    effect(() => {
      this.applyTheme(this.currentTheme());
    });
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  toggleTheme(): void {
    const current = this.resolvedTheme();
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }

  private applyTheme(theme: Theme): void {
    const resolved =
      theme === 'system'
        ? this.mediaQuery.matches
          ? 'dark'
          : 'light'
        : theme;

    this.resolvedTheme.set(resolved);
    document.documentElement.setAttribute('data-theme', resolved);
  }
}
