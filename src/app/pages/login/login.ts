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
import { Firestore, doc, setDoc }  from '@angular/fire/firestore';

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

        // Verifica que el correo esté confirmado
        if (!cred.user.emailVerified) {
          this.errorMsg = '❌ Tu correo no está verificado. Revisa tu bandeja.';
          return;
        }

        // 🔑 AÑADIDO: marcamos sesión guardando algo en localStorage
        localStorage.setItem('token', cred.user.uid);

        // Acceso concedido → admin
        this.ngZone.run(() => this.router.navigate(['/admin']));

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
        await setDoc(doc(this.fs, 'users', cred.user.uid), {
          email:     cred.user.email,
          role:      'customer',
          createdAt: Date.now()
        });

        this.infoMsg = 
          '✅ Te enviamos un correo de verificación. ' +
          'Ábrelo (revísate spam) y luego vuelve a iniciar sesión.';
        this.isLogin = true;
      }
    } catch (e: any) {
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