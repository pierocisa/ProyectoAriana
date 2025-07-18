import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

interface UserData {
  email: string;
  role: 'admin' | 'customer';
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

  /** 🔑 Login: autentica y redirige según rol */
  async login(email: string, password: string): Promise<boolean> {
    try {
      const cred = await this.afAuth.signInWithEmailAndPassword(email, password);
      const uid = cred.user?.uid;
      if (!uid) {
        console.warn('❌ No se pudo obtener UID');
        return false;
      }

      const userDocRef = this.firestore.collection<UserData>('users').doc(uid);
      const snap = await userDocRef.ref.get();
      let userData = snap.data();

      if (!userData) {
        // Si no existe, creamos perfil por defecto
        userData = {
          email,
          role: 'customer',
          createdAt: Date.now()
        };
        await userDocRef.set(userData);
        console.log('📄 Usuario creado en Firestore con rol: customer');
      }

      console.log('🔥 Datos del usuario Firestore:', userData);

      // Redirige según role
      if (userData.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/cliente']);
      }
      return true;

    } catch (err: any) {
      console.error('❌ Error al iniciar sesión:', err.message || err);
      return false;
    }
  }

  /** 🔐 Logout */
  logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
    console.log('🔒 Sesión cerrada');
  }

  /** ✍️ Register: crea cuenta en Auth y doc en Firestore */
  async register(email: string, password: string): Promise<boolean> {
    try {
      const cred = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = cred.user?.uid;
      if (!uid) {
        console.error('❌ No se obtuvo UID al registrar');
        return false;
      }

      const newUser: UserData = {
        email,
        role: 'customer',
        createdAt: Date.now()
      };
      await this.firestore.collection<UserData>('users').doc(uid).set(newUser);
      console.log('✅ Usuario registrado y agregado a Firestore:', newUser);

      // Opcional: puedes enviar verificación de email aquí
      // await cred.user.sendEmailVerification();

      this.router.navigate(['/login']);
      return true;

    } catch (err: any) {
      console.error('❌ Error al registrar usuario:', err.message || err);
      return false;
    }
  }
}
