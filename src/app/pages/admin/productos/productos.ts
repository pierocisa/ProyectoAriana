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
    'plantas',
    'macetas',
    'sustratos',
    'cuidados', // ✅ sin tildes y minúsculas
    'paquetes'
  ];

  categoriasSeleccionadas: string[] = []; // ✅ Lista de categorías activas

  nuevoProducto = this.obtenerProductoVacio();
  productos: any[] = [];          // Todos los productos
  productosFiltrados: any[] = []; // Solo los que coinciden con filtros
  cargando = false;

  private productoService = inject(ProductoService);

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando = true;
    this.productoService.obtenerProductos().subscribe({
      next: (data: any[]) => {
        this.productos = data;
        this.filtrarProductos(); // Aplica filtros al cargar
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('❌ Error al obtener productos:', err);
        alert('⚠️ No se pudieron cargar los productos. Verifica Firestore.');
        this.cargando = false;
      }
    });
  }

  // ✅ Filtra productos según categorías seleccionadas
  filtrarProductos() {
    if (this.categoriasSeleccionadas.length === 0) {
      // Si no hay filtros, muestra todos
      this.productosFiltrados = this.productos;
    } else {
      this.productosFiltrados = this.productos.filter((p) =>
        this.categoriasSeleccionadas.includes(this.normalizarTexto(p.categoria))
      );
    }
  }

  // ✅ Detecta cambios en el checklist
  toggleCategoria(categoria: string) {
    const index = this.categoriasSeleccionadas.indexOf(categoria);
    if (index === -1) {
      this.categoriasSeleccionadas.push(categoria);
    } else {
      this.categoriasSeleccionadas.splice(index, 1);
    }
    this.filtrarProductos();
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
    this.nuevoProducto.categoria = this.normalizarTexto(this.nuevoProducto.categoria);

    if (
      this.nuevoProducto.nombre.trim() &&
      this.nuevoProducto.imagen &&
      this.nuevoProducto.categoria &&
      this.nuevoProducto.precio >= 0 &&
      this.nuevoProducto.stock >= 0
    ) {
      try {
        if (this.editandoId) {
          await this.productoService.actualizarProducto(this.editandoId, this.nuevoProducto);
          alert('✅ Producto actualizado correctamente.');
        } else {
          await this.productoService.agregarProducto(this.nuevoProducto);
          alert('✅ Producto agregado correctamente.');
        }
        this.cerrarModal();
        this.cargarProductos();
      } catch (err) {
        console.error('❌ Error al guardar producto:', err);
        alert('⚠️ Error al guardar el producto.');
      }
    } else {
      alert('⚠️ Completa todos los campos requeridos.');
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
      .then(() => this.cargarProductos())
      .catch(err => console.error('❌ Error al inhabilitar producto:', err));
  }

  activar(producto: any) {
    this.productoService.actualizarProducto(producto.id, { estado: 'activo' })
      .then(() => this.cargarProductos())
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
      stock: 0,
      categoria: '',
      estado: 'activo'
    };
  }

  private normalizarTexto(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // elimina tildes
  }
}
