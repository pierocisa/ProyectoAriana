import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, CollectionReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  private coleccion: CollectionReference;

  constructor(private firestore: Firestore) {
    // ✅ Inicializamos la colección cuando Firestore ya está disponible
    this.coleccion = collection(this.firestore, 'promociones');
  }

  /**
   * 📝 Obtener todas las promociones
   */
  obtenerPromociones(): Observable<any[]> {
    return from(
      getDocs(this.coleccion).then(snapshot =>
        snapshot.docs.map(docSnap => {
          const data = docSnap.data();
          // ⚠️ Aseguramos que `data` sea un objeto plano
          return { id: docSnap.id, ...(data ? JSON.parse(JSON.stringify(data)) : {}) };
        })
      )
    );
  }

  /**
   * ➕ Agregar una nueva promoción
   */
  agregarPromocion(promocion: any): Promise<any> {
    return addDoc(this.coleccion, promocion);
  }

  /**
   * ✏️ Actualizar una promoción existente
   */
  actualizarPromocion(id: string, datos: any): Promise<any> {
    const ref = doc(this.firestore, `promociones/${id}`);
    return updateDoc(ref, datos);
  }

  /**
   * 🗑️ Eliminar una promoción
   */
  eliminarPromocion(id: string): Promise<any> {
    const ref = doc(this.firestore, `promociones/${id}`);
    return deleteDoc(ref);
  }
}
