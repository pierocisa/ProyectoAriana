import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private coleccion = 'products';

  constructor(private firestore: Firestore) {}

  agregarProducto(producto: any) {
    // 🟢 Capitaliza la categoría antes de guardar
    producto.categoria = this.capitalizar(producto.categoria);
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, producto);
  }

  obtenerProductos() {
    const ref = collection(this.firestore, this.coleccion);
    return collectionData(ref, { idField: 'id' });
  }

  actualizarProducto(id: string, data: any) {
    // 🟢 También capitaliza si se edita la categoría
    if (data.categoria) {
      data.categoria = this.capitalizar(data.categoria);
    }
    const ref = doc(this.firestore, `${this.coleccion}/${id}`);
    return updateDoc(ref, data);
  }

  eliminarProducto(id: string) {
    const ref = doc(this.firestore, `${this.coleccion}/${id}`);
    return deleteDoc(ref);
  }

  private capitalizar(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }
}
