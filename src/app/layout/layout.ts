import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class LayoutComponent {
  anoActual = new Date().getFullYear();

  constructor(private router: Router) {}

  irAlLogin() {
    this.router.navigate(['/login']);
  }

  irAlCarrito() {
    this.router.navigate(['/carrito']);
  }
}


