import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DashboardStats } from '../models/stats.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly API_URL = 'http://localhost:3000/api'; // Replace with your API URL

  stats = signal<DashboardStats | null>(null);

  constructor(private http: HttpClient) {}

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.API_URL}/dashboard/stats`).pipe(
      tap(stats => {
        this.stats.set(stats);
      })
    );
  }

  refreshStats(): void {
    this.getStats().subscribe();
  }
}
