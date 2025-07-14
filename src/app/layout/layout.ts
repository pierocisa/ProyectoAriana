import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class LayoutComponent implements OnInit {
  anoActual = new Date().getFullYear();
  usuarioLogueado = false;  // ✅ indica si hay sesión iniciada

  constructor(private router: Router) {}

  ngOnInit(): void {
    // 🟢 Al iniciar, verifica si hay un token en el localStorage
    this.usuarioLogueado = !!localStorage.getItem('token');
  }

  /** ✅ Ir siempre al inicio */
  irAInicio(): void {
    this.router.navigateByUrl('/', { skipLocationChange: false });
  }

  /** 🔐 Login o cerrar sesión */
  irAlLoginOCerrarSesion(): void {
    if (this.usuarioLogueado) {
      // 🛑 Cerrar sesión
      localStorage.removeItem('token');
      this.usuarioLogueado = false;
      alert('👋 Has cerrado sesión correctamente.');
      this.irAInicio(); // Llévalo al inicio
    } else {
      // 🔑 Redirigir a login
      this.router.navigate(['/login']);
    }
  }

  /** 🛒 Ir al carrito */
  irAlCarrito(): void {
    this.router.navigate(['/carrito']);
  }
}
