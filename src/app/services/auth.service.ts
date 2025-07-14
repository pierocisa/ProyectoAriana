import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  resetPassword(email: string) {
    throw new Error('Method not implemented.');
  }
  // Simula un inicio de sesión
  login(email: string, password: string): Promise<boolean> {
    // 🔐 Aquí puedes conectar con Firebase Auth o validar
    if (email === 'admin@demo.com' && password === '123456') {
      console.log('✅ Login exitoso');
      return Promise.resolve(true);
    } else {
      console.warn('❌ Credenciales incorrectas');
      return Promise.reject('Credenciales incorrectas');
    }
  }

  logout() {
    console.log('🚪 Sesión cerrada');
  }
}
