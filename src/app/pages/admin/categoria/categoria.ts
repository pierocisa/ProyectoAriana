import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from './categoria.service';


@Component({
  standalone: true,
  selector: 'app-categoria',
  imports: [CommonModule, FormsModule],
  templateUrl: './categoria.html',
  styleUrls: ['./categoria.css']
})
export class CategoriasComponent implements OnInit {
  modalActivo = false;
  editandoId: string | null = null;

  nuevaCategoria = {
    nombre: '',
    imagen: '',
    estado: 'activa'
  };

  categorias: any[] = [];
  cargando = false;

  private categoriaService = inject(CategoriaService);

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.cargando = true;
    this.categoriaService.obtenerCategorias().subscribe({
      next: (data: any[]) => {
        console.log('📦 Categorías obtenidas:', data);
        this.categorias = data;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('❌ Error al obtener categorías:', err);
        this.cargando = false;
      }
    });
  }

  abrirModal(categoria?: any) {
    this.modalActivo = true;
    if (categoria) {
      this.editandoId = categoria.id;
      this.nuevaCategoria = { ...categoria };
    } else {
      this.editandoId = null;
      this.nuevaCategoria = { nombre: '', imagen: '', estado: 'activa' };
    }
  }

  cerrarModal() {
    this.modalActivo = false;
    this.editandoId = null;
    this.nuevaCategoria = { nombre: '', imagen: '', estado: 'activa' };
  }

  async guardarCategoria() {
    if (this.nuevaCategoria.nombre.trim() && this.nuevaCategoria.imagen) {
      try {
        if (this.editandoId) {
          await this.categoriaService.actualizarCategoria(this.editandoId, this.nuevaCategoria);
          console.log('✅ Categoría actualizada');
        } else {
          await this.categoriaService.agregarCategoria(this.nuevaCategoria);
          console.log('✅ Categoría agregada');
        }
        this.cerrarModal();
        this.cargarCategorias(); // 🔄 Recargar
      } catch (err) {
        console.error('❌ Error al guardar categoría:', err);
      }
    } else {
      alert('⚠️ Completa todos los campos.');
    }
  }

  cargarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.nuevaCategoria.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  inhabilitar(categoria: any) {
    this.categoriaService.actualizarCategoria(categoria.id, { estado: 'inactiva' })
      .then(() => this.cargarCategorias());
  }

  activar(categoria: any) {
    this.categoriaService.actualizarCategoria(categoria.id, { estado: 'activa' })
      .then(() => this.cargarCategorias());
  }
}
