import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watermark',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="watermark">
      <div class="watermark__content">
        <span class="watermark__copyright">&copy; {{ currentYear }} Jeffrey Shapiro</span>
        <span class="watermark__separator">|</span>
        <span class="watermark__notice">Trial Version - License Required for Continued Use</span>
      </div>
    </div>
  `,
  styles: [`
    .watermark {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      pointer-events: none;
      padding: 1.5rem 2rem;
      background: linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.4) 60%, transparent);
    }

    .watermark__content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.95);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
      letter-spacing: 0.025em;
    }

    .watermark__copyright {
      font-weight: 700;
      font-size: 1.25rem;
    }

    .watermark__separator {
      opacity: 0.6;
      font-size: 1.5rem;
    }

    .watermark__notice {
      font-style: italic;
      font-weight: 500;
      color: #fbbf24;
    }

    @media (max-width: 640px) {
      .watermark {
        padding: 1rem 1.5rem;
      }

      .watermark__content {
        flex-direction: column;
        gap: 0.5rem;
        font-size: 1rem;
      }

      .watermark__copyright {
        font-size: 1.125rem;
      }

      .watermark__separator {
        display: none;
      }
    }
  `],
  host: {
    class: 'contents',
  },
})
export class WatermarkComponent {
  currentYear = new Date().getFullYear();
}
