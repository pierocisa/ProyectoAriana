import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, collection, addDoc } from '@angular/fire/firestore';
import { ProductoService } from './producto.service'; // ✅ Corregido
import { PedidoService } from './pedido.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carrito: any[] = [];

  constructor(
    private firestore: Firestore,
    private productoService: ProductoService, // ✅ Correcto
    private pedidoService: PedidoService      // ✅ Correcto
  ) {}

  agregar(producto: any, categoria: string, cantidad: number) {
    const copia = { ...producto, categoria, cantidad };
    this.carrito.push(copia);
  }

  obtenerCarrito() {
    return this.carrito;
  }

  eliminar(index: number) {
    this.carrito.splice(index, 1);
  }

  vaciar() {
    this.carrito = [];
  }

  async procesarCompra(cliente: any) {
    for (const item of this.carrito) {
      if (item.cantidad > item.stock) {
        alert(`❌ Producto agotado: ${item.nombre}. Solo quedan ${item.stock} unidades.`);
        return;
      }
    }

    const pedidosRef = collection(this.firestore, 'orders');
    const pedido = {
      cliente,
      productos: this.carrito.map((p) => ({
        id: p.id,
        nombre: p.nombre,
        cantidad: p.cantidad,
        precio: p.precio
      })),
      fecha: new Date(),
      estado: 'Pendiente'
    };

    await addDoc(pedidosRef, pedido);

    // 🔻 Reducir stock en productos
    for (const item of this.carrito) {
      await this.productoService.reducirStockProducto(item.id, item.cantidad);
    }

    this.vaciar();
    alert('✅ Compra realizada correctamente.');
  }
}
  