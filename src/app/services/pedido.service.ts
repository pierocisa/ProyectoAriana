import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private firestore = inject(Firestore);
  private coleccion = 'orders';

  /**
   * 🔥 Obtiene todos los pedidos con su ID
   */
  obtenerPedidos(): Observable<any[]> {
    const ref = collection(this.firestore, this.coleccion);
    return collectionData(ref, { idField: 'id' });
  }

  /**
   * 🗑️ Elimina un pedido por su ID
   */
  eliminarPedido(id: string): Promise<void> {
    const ref = doc(this.firestore, `${this.coleccion}/${id}`);
    return deleteDoc(ref);
  }

  /**
   * ✅ Crea un pedido nuevo con los datos del usuario y del carrito
   * @param usuarioId UID del usuario autenticado
   * @param usuarioEmail Email del usuario
   * @param productos Lista de productos del carrito
   * @param total Total a pagar
   */
  crearPedido(usuarioId: string, usuarioEmail: string, productos: any[], total: number): Promise<any> {
    const pedido = {
      usuarioId,                     // UID del usuario
      usuarioEmail,                  // Email para mostrar en el admin
      productos,                     // Lista de productos comprados
      total,                         // Total del pedido
      estado: 'pendiente',           // Estado inicial (puede ser: pendiente, enviado, entregado)
      fecha: new Date().toISOString() // Fecha de creación en formato ISO
    };

    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, pedido);
  }
}
