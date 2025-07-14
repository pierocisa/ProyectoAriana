import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private coleccion = 'users';

  obtenerUsuarios() {
    const ref = collection(this.firestore, this.coleccion);
    return collectionData(ref, { idField: 'id' });
  }

  actualizarUsuario(id: string, data: any) {
  const ref = doc(this.firestore, `${this.coleccion}/${id}`);
  return updateDoc(ref, data);
}


  actualizarRol(id: string, rol: string) {
    const ref = doc(this.firestore, `${this.coleccion}/${id}`);
    return updateDoc(ref, { role: rol });
  }

  actualizarEstado(id: string, estado: string) {
    const ref = doc(this.firestore, `${this.coleccion}/${id}`);
    return updateDoc(ref, { estado: estado });
  }

  resetearPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
}
