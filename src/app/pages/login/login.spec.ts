import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    public auth: AuthService,   // público para poder usar auth.* en el template
    private router: Router
  ) {}

  /** Se dispara al enviar el formulario */
  async login(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;
    this.error = '';
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/']);  // ajustar ruta destino tras login
    } catch (err: any) {
      this.error = err.code
        ? err.code.replace('auth/', '').replace(/-/g, ' ')
        : 'Error desconocido';
    } finally {
      this.loading = false;
    }
  }

  /** Envía email de recuperación */
  async resetPassword() {
    if (!this.email) {
      this.error = 'Ingresa tu email para recuperar contraseña';
      return;
    }
    try {
      await this.auth.resetPassword(this.email);
      alert('✅ Correo de recuperación enviado');
    } catch (err: any) {
      this.error = err.message || 'No se pudo enviar el correo';
    }
  }
}
