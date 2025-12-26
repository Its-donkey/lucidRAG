import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DashboardStats } from '../models/stats.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  stats = signal<DashboardStats | null>(null);

  constructor(private http: HttpClient) {}

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${environment.apiUrl}/dashboard/stats`).pipe(
      tap((stats) => {
        this.stats.set(stats);
      })
    );
  }

  refreshStats(): void {
    this.getStats().subscribe();
  }
}
