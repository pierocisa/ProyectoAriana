import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private coleccion = 'orders';

  constructor(private firestore: Firestore) {}

  // 🔄 Obtener todos los pedidos
  obtenerPedidos(): Observable<any[]> {
    const ref = collection(this.firestore, this.coleccion);
    return collectionData(ref, { idField: 'id' });
  }

  // 🗑 Eliminar pedido
  eliminarPedido(id: string) {
    const ref = doc(this.firestore, `${this.coleccion}/${id}`);
    return deleteDoc(ref);
  }

  // ➕ Agregar pedido
  agregarPedido(pedido: any) {
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, pedido);
  }
}
