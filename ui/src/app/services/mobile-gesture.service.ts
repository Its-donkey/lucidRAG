import { Injectable, signal, inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface SwipeEvent {
  direction: 'left' | 'right' | 'up' | 'down';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  deltaX: number;
  deltaY: number;
}

@Injectable({ providedIn: 'root' })
export class MobileGestureService {
  private document = inject(DOCUMENT);
  private ngZone = inject(NgZone);

  isMobile = signal(false);
  sidebarOpen = signal(false);

  private touchStartX = 0;
  private touchStartY = 0;
  private readonly SWIPE_THRESHOLD = 50;
  private readonly EDGE_THRESHOLD = 30;

  private swipeCallbacks: ((event: SwipeEvent) => void)[] = [];

  constructor() {
    this.checkMobile();
    this.setupListeners();
  }

  private checkMobile(): void {
    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    this.isMobile.set(isMobileDevice);

    // Listen for resize
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('resize', () => {
        this.ngZone.run(() => {
          this.isMobile.set(window.innerWidth < 768);
        });
      });
    });
  }

  private setupListeners(): void {
    this.ngZone.runOutsideAngular(() => {
      this.document.addEventListener(
        'touchstart',
        (e: TouchEvent) => this.onTouchStart(e),
        { passive: true }
      );

      this.document.addEventListener(
        'touchend',
        (e: TouchEvent) => this.onTouchEnd(e),
        { passive: true }
      );
    });
  }

  private onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  private onTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const deltaX = touchEndX - this.touchStartX;
    const deltaY = touchEndY - this.touchStartY;

    // Only process horizontal swipes
    if (Math.abs(deltaX) < this.SWIPE_THRESHOLD) return;
    if (Math.abs(deltaY) > Math.abs(deltaX)) return; // Vertical swipe

    const isEdgeSwipe = this.touchStartX < this.EDGE_THRESHOLD;
    const direction = deltaX > 0 ? 'right' : 'left';

    this.ngZone.run(() => {
      // Handle sidebar open/close
      if (direction === 'right' && isEdgeSwipe && !this.sidebarOpen()) {
        this.sidebarOpen.set(true);
      } else if (direction === 'left' && this.sidebarOpen()) {
        this.sidebarOpen.set(false);
      }

      // Notify callbacks
      const swipeEvent: SwipeEvent = {
        direction,
        startX: this.touchStartX,
        startY: this.touchStartY,
        endX: touchEndX,
        endY: touchEndY,
        deltaX,
        deltaY,
      };

      this.swipeCallbacks.forEach((cb) => cb(swipeEvent));
    });
  }

  onSwipe(callback: (event: SwipeEvent) => void): () => void {
    this.swipeCallbacks.push(callback);
    return () => {
      const index = this.swipeCallbacks.indexOf(callback);
      if (index > -1) {
        this.swipeCallbacks.splice(index, 1);
      }
    };
  }

  openSidebar(): void {
    this.sidebarOpen.set(true);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }
}
