import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WatermarkComponent } from './components/shared/watermark/watermark';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WatermarkComponent],
  template: `
    <router-outlet></router-outlet>
    <app-watermark></app-watermark>
  `,
})
export class App {}
