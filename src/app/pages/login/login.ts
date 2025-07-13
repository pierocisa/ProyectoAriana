// src/app/pages/login/login.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';

import {
  Firestore,
  doc,
  setDoc
} from '@angular/fire/firestore';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls:  ['./login.css'],
  imports:    [CommonModule, FormsModule]
})
export class LoginComponent {
  email    = '';
  password = '';
  isLogin  = true;                      // ← modo actual
  errorMsg = signal<string|null>(null);

  private auth = inject(Auth);
  private fs   = inject(Firestore);
  private router = inject(Router);

  toggleMode() {
    this.errorMsg.set(null);
    this.isLogin = !this.isLogin;
  }

  /** Llama a login o signup según isLogin */
  async submit(): Promise<void> {
    this.errorMsg.set(null);

    try {
      if (this.isLogin) {
        // --- LOGIN ---
        await signInWithEmailAndPassword(this.auth, this.email, this.password);
        this.router.navigate(['/admin']);
      } else {
        // --- SIGNUP ---
        const cred = await createUserWithEmailAndPassword(
          this.auth,
          this.email,
          this.password
        );
        // Una vez creado en Auth, guardamos el perfil en Firestore:
        await setDoc(
          doc(this.fs, 'users', cred.user.uid),
          {
            email: cred.user.email,
            role:  'customer',          // rol por defecto
            createdAt: Date.now()
          }
        );
        this.errorMsg.set('✅ Usuario creado. Ahora inicia sesión.');
        this.isLogin = true;
      }
    } catch (e: any) {
      this.errorMsg.set(e.message ?? 'Error inesperado');
    }
  }
}



