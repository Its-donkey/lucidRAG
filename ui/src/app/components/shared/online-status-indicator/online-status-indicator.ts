import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type OnlineStatus = 'online' | 'away' | 'offline';

@Component({
  selector: 'app-online-status-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './online-status-indicator.html',
  styleUrls: ['./online-status-indicator.scss'],
})
export class OnlineStatusIndicatorComponent {
  @Input() set status(value: OnlineStatus) {
    this._status.set(value);
  }
  @Input() showLabel = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() lastSeen?: Date;

  private _status = signal<OnlineStatus>('offline');

  statusColor = computed(() => {
    const status = this._status();
    switch (status) {
      case 'online':
        return 'var(--color-success)';
      case 'away':
        return 'var(--color-warning)';
      case 'offline':
      default:
        return 'var(--color-text-tertiary)';
    }
  });

  statusLabel = computed(() => {
    const status = this._status();
    switch (status) {
      case 'online':
        return 'Online';
      case 'away':
        return 'Away';
      case 'offline':
      default:
        return this.lastSeen ? this.formatLastSeen(this.lastSeen) : 'Offline';
    }
  });

  sizeClass = computed(() => {
    switch (this.size) {
      case 'sm':
        return 'w-2 h-2';
      case 'lg':
        return 'w-4 h-4';
      case 'md':
      default:
        return 'w-3 h-3';
    }
  });

  private formatLastSeen(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays}d ago`;
    }
  }
}
