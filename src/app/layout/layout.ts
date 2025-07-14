import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class LayoutComponent implements OnInit {
  anoActual = new Date().getFullYear();
  usuarioLogueado = false;  // ✅ flag para estado de sesión

  constructor(private router: Router) {}

  ngOnInit() {
    // Al cargar, lee si hay token en localStorage
    this.usuarioLogueado = !!localStorage.getItem('token');
  }

  /** Inicia login o cierra sesión según estado */
  irAlLoginOCerrarSesion() {
    if (this.usuarioLogueado) {
      // Cierra sesión
      localStorage.removeItem('token');
      this.usuarioLogueado = false;
      this.router.navigate(['/']);        // o ['/inicio'] si así lo prefieres
    } else {
      // Lleva al login
      this.router.navigate(['/login']);
    }
  }

  /** Navega al carrito (sin cambios) */
  irAlCarrito() {
    this.router.navigate(['/carrito']);
  }
}