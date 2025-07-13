import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';

@Component({
  standalone: true,
  selector: 'app-productos',
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent implements OnInit {
  modalActivo = false;
  editandoId: string | null = null;

  categoriasDisponibles: string[] = [
    'Plantas',
    'Macetas',
    'Sustratos',
    'Líneas de cuidado',
    'Paquetes'
  ];

  nuevoProducto = this.obtenerProductoVacio();
  productos: any[] = [];
  cargando = false;

  private productoService = inject(ProductoService);

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando = true;
    this.productoService.obtenerProductos().subscribe({
      next: (data: any[]) => {
        console.log('📦 Productos obtenidos:', data);
        this.productos = data;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('❌ Error al obtener productos:', err);
        alert('⚠️ No se pudieron cargar los productos. Verifica las reglas de Firestore.');
        this.cargando = false;
      }
    });
  }

  abrirModal(producto?: any) {
    this.modalActivo = true;
    if (producto) {
      this.editandoId = producto.id;
      this.nuevoProducto = { ...producto };
    } else {
      this.editandoId = null;
      this.nuevoProducto = this.obtenerProductoVacio();
    }
  }

  cerrarModal() {
    this.modalActivo = false;
    this.editandoId = null;
    this.resetearFormulario();
  }

  async guardarProducto() {
    if (
      this.nuevoProducto.nombre.trim() &&
      this.nuevoProducto.imagen &&
      this.nuevoProducto.categoria
    ) {
      try {
        if (this.editandoId) {
          await this.productoService.actualizarProducto(this.editandoId, this.nuevoProducto);
          console.log('✅ Producto actualizado');
          alert('✅ Producto actualizado correctamente.');
        } else {
          await this.productoService.agregarProducto(this.nuevoProducto);
          console.log('✅ Producto agregado');
          alert('✅ Producto agregado correctamente.');
        }
        this.cerrarModal();
        this.cargarProductos();
      } catch (err) {
        console.error('❌ Error al guardar producto:', err);
        alert('⚠️ Error al guardar el producto. Revisa la conexión a Firestore o las reglas.');
      }
    } else {
      alert('⚠️ Completa todos los campos requeridos');
    }
  }

  cargarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.nuevoProducto.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  inhabilitar(producto: any) {
    this.productoService.actualizarProducto(producto.id, { estado: 'inactivo' })
      .then(() => {
        console.log('🚫 Producto inhabilitado');
        this.cargarProductos();
      })
      .catch(err => console.error('❌ Error al inhabilitar producto:', err));
  }

  activar(producto: any) {
    this.productoService.actualizarProducto(producto.id, { estado: 'activo' })
      .then(() => {
        console.log('✅ Producto activado');
        this.cargarProductos();
      })
      .catch(err => console.error('❌ Error al activar producto:', err));
  }

  private resetearFormulario() {
    this.nuevoProducto = this.obtenerProductoVacio();
  }

  private obtenerProductoVacio() {
    return {
      nombre: '',
      descripcion: '',
      imagen: '',
      precio: 0,
      categoria: '',
      estado: 'activo'
    };
  }
}
