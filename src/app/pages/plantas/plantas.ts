import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';
import { ProductoService } from '../../services/producto.service';

@Component({
  standalone: true,
  selector: 'app-plantas',
  imports: [CommonModule],
  templateUrl: './plantas.html',
  styleUrls: ['./plantas.css']
})
export class PlantasComponent implements OnInit {
  imagenGrande: string | null = null;
  productos: any[] = [];
  cargando: boolean = true;

  constructor(
    private cartService: CartService,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productoService.obtenerProductos().subscribe({
      next: (data: any[]) => {
        // Solo mostrar productos activos y de categoría "Plantas"
        this.productos = data.filter(
          prod => prod.estado === 'activo' && prod.categoria === 'Plantas'
        );
        this.cargando = false;
      },
      error: err => {
        console.error('❌ Error al cargar productos:', err);
        this.cargando = false;
      }
    });
  }

  sumarCantidad(planta: any) {
    planta.cantidad = (planta.cantidad || 1) + 1;
  }

  restarCantidad(planta: any) {
    if ((planta.cantidad || 1) > 1) {
      planta.cantidad--;
    }
  }

  anadirAlCarrito(planta: any) {
    this.cartService.agregar(planta, 'Plantas', planta.cantidad || 1);
    planta.agregado = true;

    setTimeout(() => {
      planta.agregado = false;
    }, 1500);
  }

  verImagen(planta: any) {
    this.imagenGrande = planta.imagen;
  }

  cerrarImagen() {
    this.imagenGrande = null;
  }
}
