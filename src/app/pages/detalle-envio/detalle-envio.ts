import { Component, OnInit }   from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router }              from '@angular/router';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';

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
  codigoPago: string = '';         // ✅ Código de operación ingresado por el cliente
  mostrandoQR: boolean = false;    // ✅ Mostrar u ocultar el QR de pago
  cargando: boolean = false;       // ✅ Spinner al guardar

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

  eliminarItem(i: number): void {
    this.cartService.eliminar(i);
    this.carrito = this.cartService.obtenerCarrito();
  }

  mostrarQR(): void {
    if (this.carrito.length === 0) {
      alert('❌ Tu carrito está vacío');
      return;
    }
    this.mostrandoQR = true;
  }

  /** 📨 Enviar pedido con código de operación */
  async subirCodigoOperacion(f: NgForm): Promise<void> {
    if (f.invalid || !this.codigoPago) {
      alert('❌ Completa los datos de envío y agrega un código de operación.');
      return;
    }

    this.cargando = true;

    try {
      const user: User | null = await new Promise(resolve => {
        const unsub = onAuthStateChanged(this.auth, u => {
          unsub();
          resolve(u);
        });
      });

      if (!user) {
        alert('🔐 Debes iniciar sesión para confirmar tu pedido.');
        this.router.navigate(['/login']);
        return;
      }

      const nuevoPedido: Order = stripUndefined({
        productos: this.carrito.map(item => ({
          id:       item.id,
          nombre:   item.nombre,
          precio:   item.precio,
          cantidad: item.cantidad
        })),
        cliente: f.value,
        codigoOperacion: this.codigoPago, // ✅ Guarda el código de operación
        estado:    'PENDIENTE',            // Estado inicial
        fecha:     new Date(),
        total:     this.total,
        userId:    user.uid
      });

      const ref = await this.orderService.crearPedido(nuevoPedido);
      console.log('✅ Pedido guardado con ID:', ref);

      this.cartService.vaciar();
      alert('✅ Pedido enviado correctamente. El administrador validará tu pago.');
      this.router.navigate(['/']);
    } catch (err) {
      console.error('❌ Error al enviar pedido:', err);
      alert('⚠️ Ocurrió un error al enviar el pedido. Intenta nuevamente.');
    } finally {
      this.cargando = false;
    }
  }
}
