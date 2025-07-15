import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

interface UserData {
  email: string;
  role: 'admin' | 'customer'; // solo permitimos estos dos valores
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  async login(email: string, password: string): Promise<boolean> {
    try {
      // 🔑 Inicia sesión en Firebase Authentication
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const uid = userCredential.user?.uid;

      if (!uid) {
        console.warn('❌ No se pudo obtener UID');
        return false;
      }

      // 📄 Referencia al documento en Firestore
      const userDocRef = this.firestore.collection<UserData>('users').doc(uid);
      const userDocSnap = await userDocRef.get().toPromise();

      let userData: UserData | undefined = userDocSnap?.data();

      if (!userData) {
        // ⚡ Si no existe el documento, crear uno con rol por defecto
        userData = {
          email: email,
          role: 'customer', // Rol por defecto
          createdAt: Date.now()
        };
        await userDocRef.set(userData);
        console.log('📄 Usuario creado en Firestore con rol: customer');
      }

      console.log('🔥 Datos del usuario Firestore:', userData);

      // ✅ Verificar el rol del usuario
      switch (userData.role) {
        case 'admin':
          console.log('✅ Usuario administrador');
          this.router.navigate(['/admin']); // Cambia a la ruta del panel admin
          return true;

        case 'customer':
          console.log('✅ Usuario cliente');
          this.router.navigate(['/cliente']); // Cambia a la ruta cliente
          return true;

        default:
          console.warn('⚠️ Rol no definido o desconocido:', userData.role);
          return false;
      }

    } catch (error: any) {
      console.error('❌ Error al iniciar sesión:', error.message || error);
      return false;
    }
  }

  logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
    console.log('🔒 Sesión cerrada');
  }
}
