import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private coleccion = 'categorias'; // 👈 Nombre de la colección en Firestore

  constructor(private firestore: Firestore) {}

  // ➕ Agregar nueva categoría
  agregarCategoria(categoria: any) {
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, categoria);
  }

  // 📥 Obtener todas las categorías
  obtenerCategorias() {
    const ref = collection(this.firestore, this.coleccion);
    return collectionData(ref, { idField: 'id' });
  }

  // ✏️ Actualizar categoría
  actualizarCategoria(id: string, data: any) {
    const ref = doc(this.firestore, `${this.coleccion}/${id}`);
    return updateDoc(ref, data);
  }

  // ❌ Eliminar categoría
  eliminarCategoria(id: string) {
    const ref = doc(this.firestore, `${this.coleccion}/${id}`);
    return deleteDoc(ref);
  }
}
