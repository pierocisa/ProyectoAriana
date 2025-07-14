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

  // ✅ Variables para modal
  modalActivo = false;
  editandoId: number | null = null;
  usuarioEditando: any = this.obtenerUsuarioVacio();

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

  // ✅ Modal
  abrirModal(index?: number) {
    if (index !== undefined) {
      this.editandoId = index;
      this.usuarioEditando = { ...this.usuarios[index] }; // Copia
    } else {
      this.editandoId = null;
      this.usuarioEditando = this.obtenerUsuarioVacio();
    }
    this.modalActivo = true;
  }

  cerrarModal() {
    this.modalActivo = false;
    this.editandoId = null;
  }

  guardarCambiosUsuario() {
    if (!this.usuarioEditando.id) {
      alert('⚠️ No se puede actualizar un usuario sin ID.');
      return;
    }

    this.usuarioService.actualizarUsuario(this.usuarioEditando.id, {
      role: this.usuarioEditando.role,
      estado: this.usuarioEditando.estado
    }).then(() => {
      alert('✅ Usuario actualizado correctamente.');
      this.cerrarModal();
      this.cargarUsuarios();
    }).catch(err => {
      console.error('❌ Error al actualizar usuario:', err);
      alert('⚠️ No se pudo actualizar el usuario.');
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

  private obtenerUsuarioVacio() {
    return {
      email: '',
      role: 'customer',
      estado: 'activo'
    };
  }
}
