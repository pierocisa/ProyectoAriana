import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';
import { ProductoService } from '../../services/producto.service'; // ✅ Importa servicio para verificar stock

@Component({
  standalone: true,
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(
    private cartService: CartService,
    private productoService: ProductoService, // ✅ Inyecta servicio
    private router: Router
  ) {}

  ngOnInit() {
    this.refrescarCarrito();
  }

  get total() {
    return this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  public obtenerCantidadTotal() {
    return this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
  }

  eliminar(i: number) {
    this.cartService.eliminar(i);
    this.refrescarCarrito();
  }

  vaciar() {
    this.cartService.vaciar();
    this.refrescarCarrito();
  }

  refrescarCarrito() {
    this.carrito = this.cartService.obtenerCarrito();
  }

  // ✅ Nueva lógica: confirmar compra con validación de stock
  async confirmarCompra(cliente: any) {
    try {
      for (const item of this.carrito) {
        if (item.cantidad > item.stock) {
          alert(`❌ Producto agotado: ${item.nombre}. Solo quedan ${item.stock} unidades.`);
          return; // ⛔ Detiene la compra
        }
      }

      // 🔥 Procesar compra y reducir stock
      await this.cartService.procesarCompra(cliente);

      // ✅ Redirigir al detalle de envío
      this.router.navigate(['/detalle-envio']);
    } catch (err) {
      console.error('❌ Error al confirmar compra:', err);
      alert('⚠️ No se pudo finalizar la compra. Intenta nuevamente.');
    }
  }

  finalizarCompra() {
  // 🔥 Redirige a la página de detalle de envío
  this.router.navigate(['/detalle-envio']);
}

}
