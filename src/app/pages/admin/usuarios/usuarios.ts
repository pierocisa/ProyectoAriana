import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  standalone: true,
  selector: 'app-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class UsuariosComponent implements OnInit {
  cargando = false;
  usuarios: any[] = [];
  filtroEmail: string = '';

  private usuarioService = inject(UsuarioService);

  ngOnInit() {
    this.cargarUsuarios();
  }

  get usuariosFiltrados() {
    return this.usuarios.filter(u =>
      u.email.toLowerCase().includes(this.filtroEmail.toLowerCase())
    );
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data: any[]) => {
        console.log('📥 Usuarios obtenidos:', data);
        this.usuarios = data;
        this.cargando = false;
      },
      error: err => {
        console.error('❌ Error al obtener usuarios:', err);
        alert('⚠️ No se pudieron cargar los usuarios.');
        this.cargando = false;
      }
    });
  }

  habilitarUsuario(user: any) {
    this.usuarioService.actualizarEstado(user.id, 'activo')
      .then(() => this.cargarUsuarios())
      .catch(err => console.error('❌ Error al habilitar usuario:', err));
  }

  deshabilitarUsuario(user: any) {
    this.usuarioService.actualizarEstado(user.id, 'inactivo')
      .then(() => this.cargarUsuarios())
      .catch(err => console.error('❌ Error al deshabilitar usuario:', err));
  }
}
