import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';

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

  finalizarCompra() {
    this.router.navigate(['/detalle-envio']);
  }
}



