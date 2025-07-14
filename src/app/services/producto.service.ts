import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { increment } from 'firebase/firestore'; // ✅ Para sumar/restar stock

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private coleccion = 'products';

  constructor(private firestore: Firestore) {}

  // 🟢 Agregar nuevo producto
  agregarProducto(producto: any) {
    producto.categoria = this.capitalizar(producto.categoria);
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, producto);
  }

  // 🔄 Obtener todos los productos
  obtenerProductos() {
    const ref = collection(this.firestore, this.coleccion);
    return collectionData(ref, { idField: 'id' });
  }

  // ✏️ Actualizar producto existente
  actualizarProducto(id: string, data: any) {
    if (data.categoria) {
      data.categoria = this.capitalizar(data.categoria);
    }
    const ref = doc(this.firestore, `${this.coleccion}/${id}`);
    return updateDoc(ref, data);
  }

  // 🗑 Eliminar producto
  eliminarProducto(id: string) {
    const ref = doc(this.firestore, `${this.coleccion}/${id}`);
    return deleteDoc(ref);
  }

  // 🔻 Reducir stock tras venta
  reducirStockProducto(id: string, cantidad: number) {
    if (cantidad <= 0) {
      console.warn('⚠️ No se puede reducir stock con cantidad <= 0');
      return Promise.reject('Cantidad inválida para reducir stock');
    }
    const ref = doc(this.firestore, `${this.coleccion}/${id}`);
    console.log(`🔻 Reduciendo stock de producto ${id} en ${cantidad} unidades...`);
    return updateDoc(ref, {
      stock: increment(-cantidad) // 🔥 Resta del stock actual
    });
  }

  // 🔺 Aumentar stock (reabastecimiento)
  aumentarStockProducto(id: string, cantidadExtra: number) {
    if (cantidadExtra <= 0) {
      console.warn('⚠️ No se puede aumentar stock con cantidad <= 0');
      return Promise.reject('Cantidad inválida para aumentar stock');
    }
    const ref = doc(this.firestore, `${this.coleccion}/${id}`);
    console.log(`🔺 Aumentando stock de producto ${id} en ${cantidadExtra} unidades...`);
    return updateDoc(ref, {
      stock: increment(cantidadExtra) // 🔥 Suma al stock actual
    });
  }

  // 🔤 Capitalizar categorías
  private capitalizar(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }
}
