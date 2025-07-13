// src/app/pages/detalle-envio/detalle-envio.component.ts
import { Component, OnInit }   from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router }              from '@angular/router';
import { Auth }                from '@angular/fire/auth';

import { CartService }         from '../../services/cart';
import { OrderService }        from '../../services/order.service';
import { Order }               from '../../services/order.model';

/** Elimina recursivamente todas las propiedades con valor undefined */
function stripUndefined(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(stripUndefined);
  } else if (obj && typeof obj === 'object') {
    return Object.entries(obj)
      .filter(([, v]) => v !== undefined)
      .reduce((acc, [k, v]) => {
        acc[k] = stripUndefined(v);
        return acc;
      }, {} as any);
  }
  return obj;
}

@Component({
  standalone: true,
  selector: 'app-detalle-envio',
  imports:    [ CommonModule, FormsModule ],
  templateUrl: './detalle-envio.html',
  styleUrls:  ['./detalle-envio.css']
})
export class DetalleEnvioComponent implements OnInit {
  carrito: any[] = [];

  constructor(
    private cartService:  CartService,
    private orderService: OrderService,
    private auth:         Auth,
    private router:       Router
  ) {}

  ngOnInit(): void {
    this.carrito = this.cartService.obtenerCarrito();
  }

  get subtotal(): number {
    return this.carrito.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  }
  get igv(): number {
    return +(this.subtotal * 0.10).toFixed(2);
  }
  get total(): number {
    return +(this.subtotal + this.igv).toFixed(2);
  }

  eliminarItem(i: number) {
    this.cartService.eliminar(i);
    this.carrito = this.cartService.obtenerCarrito();
  }

  async enviarPedido(f: NgForm) {
    if (f.invalid) {
      f.control.markAllAsTouched();
      return;
    }

    const user = this.auth.currentUser;
    if (!user) {
      alert('❌ Debes iniciar sesión.');
      this.router.navigate(['/login']);
      return;
    }

    // Prepara el pedido “crudo”
    const nuevoPedido: any = {
      productos: this.carrito.map(item => ({
        nombre:   item.nombre,
        precio:   item.precio,
        cantidad: item.cantidad
      })),
      cliente: f.value,
      fecha:   new Date(),
      total:   this.total,
      userId:  user.uid
    };

    // Limpia undefined
    const pedidoLimpio: Order = stripUndefined(nuevoPedido);

    try {
      const ref = await this.orderService.crearPedido(pedidoLimpio);
      console.log('Pedido guardado con ID:', ref.id);
      this.cartService.vaciar();
      alert('✅ Pedido enviado correctamente');
      this.router.navigate(['/']);
    } catch (err) {
      console.error('Error al enviar pedido:', err);
      alert('❌ Error al enviar pedido');
    }
  }
}