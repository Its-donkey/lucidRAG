import { Component, ElementRef, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
})
export class SearchBarComponent {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(public searchService: SearchService) {
    // Focus input when search opens
    effect(() => {
      if (this.searchService.isSearchOpen()) {
        setTimeout(() => this.searchInput?.nativeElement?.focus(), 0);
      }
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.search(value);
  }

  clearSearch(): void {
    this.searchService.clearFilters();
    this.searchInput?.nativeElement?.focus();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.searchService.closeSearch();
    }
  }
}
