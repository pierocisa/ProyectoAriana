import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet // 👈 Necesario para que funcione el <router-outlet>
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent {}


