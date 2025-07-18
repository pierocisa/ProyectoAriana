import { Component, NgZone }      from '@angular/core';
import { CommonModule }            from '@angular/common';
import { FormsModule, NgForm }     from '@angular/forms';
import { Router }                  from '@angular/router';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  getDoc
} from '@angular/fire/firestore';

interface UserData {
  email: string;
  role: 'admin' | 'customer';
  createdAt: number;
}

@Component({
  standalone: true,
  selector: 'app-login',
  imports:    [ CommonModule, FormsModule ],
  templateUrl: './login.html',
  styleUrls:  ['./login.css']
})
export class LoginComponent {
  email       = '';
  password    = '';
  isLogin     = true;    // true = “Iniciar sesión”, false = “Registrarse”
  errorMsg    = '';
  infoMsg     = '';

  constructor(
    private auth:   Auth,
    private fs:     Firestore,
    private router: Router,
    private ngZone: NgZone
  ) {}

  toggleMode() {
    this.errorMsg = '';
    this.infoMsg  = '';
    this.isLogin  = !this.isLogin;
  }

  /** Maneja el submit del formulario */
  async submit(form: NgForm) {
    this.errorMsg = '';
    this.infoMsg  = '';

    if (form.invalid) {
      this.errorMsg = 'Por favor completa todos los campos.';
      return;
    }

    try {
      if (this.isLogin) {
        // — LOGIN —
        const cred = await signInWithEmailAndPassword(
          this.auth,
          this.email,
          this.password
        );

        // Verifica email
        if (!cred.user.emailVerified) {
          this.errorMsg = '❌ Tu correo no está verificado. Revisa tu bandeja.';
          return;
        }

        // Lee rol desde Firestore
        const userRef = doc(this.fs, 'users', cred.user.uid);
        const snap    = await getDoc(userRef);
        if (!snap.exists()) {
          this.errorMsg = '❌ Usuario sin perfil en Firestore.';
          return;
        }
        const data = snap.data() as UserData;
        const role = data.role;
        
        // Redirige según rol
        if (role === 'admin') {
          this.ngZone.run(() => this.router.navigate(['/admin']));
        } else {
          this.ngZone.run(() => this.router.navigate(['/cliente']));
        }

      } else {
        // — SIGNUP —
        const cred = await createUserWithEmailAndPassword(
          this.auth,
          this.email,
          this.password
        );

        // Envía correo de verificación
        await sendEmailVerification(cred.user, {
          url: window.location.origin + '/login'
        });

        // Guarda perfil mínimo en Firestore
        const newUser: UserData = {
          email: cred.user.email!,
          role: 'customer',
          createdAt: Date.now()
        };
        await setDoc(doc(this.fs, 'users', cred.user.uid), newUser);

        this.infoMsg =
          '✅ Te enviamos un correo de verificación. ' +
          'Ábrelo (revísate spam) y luego vuelve a iniciar sesión.';
        this.isLogin = true;
      }

    } catch (e: any) {
      // Limpia el código auth/xxx a algo legible
      this.errorMsg = e.code
        ? e.code.replace('auth/', '').replace(/-/g, ' ')
        : (e.message || 'Error inesperado');
    }
  }

  /** Reenvía el correo de verificación si aún no se confirmó */
  async resendVerification() {
    this.errorMsg = '';
    this.infoMsg  = '';
    const user = this.auth.currentUser;
    if (user && !user.emailVerified) {
      await sendEmailVerification(user, { url: window.location.origin + '/login' });
      this.infoMsg = '✅ Reenviamos el correo de verificación.';
    } else {
      this.errorMsg = '⚠️ No hay usuario pendiente de verificación.';
    }
  }
}
