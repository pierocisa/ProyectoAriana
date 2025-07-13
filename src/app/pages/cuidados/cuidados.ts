import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CartService } from '../../services/cart';

@Component({
  standalone: true,
  selector: 'app-cuidados',
  imports: [CommonModule],
  templateUrl: './cuidados.html',
  styleUrls: ['./cuidados.css']
})
export class CuidadosComponent implements OnInit {
  productos: any[] = [];
  imagenGrande: string | null = null;
  cargando: boolean = true;

  constructor(
    private productoService: ProductoService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.obtenerProductos().subscribe((data: any[]) => {
      this.productos = data
        .filter(
          (p) =>
            this.normalizar(p.categoria) === 'cuidados' &&
            this.normalizar(p.estado) === 'activo'
        )
        .map((p) => ({
          ...p,
          cantidad: 1,
          agregado: false
        }));
      this.cargando = false;
    });
  }

  sumarCantidad(item: any) {
    item.cantidad++;
  }

  restarCantidad(item: any) {
    if (item.cantidad > 1) item.cantidad--;
  }

  anadirAlCarrito(item: any) {
    this.cartService.agregar(item, 'cuidados', item.cantidad);
    item.agregado = true;
    setTimeout(() => (item.agregado = false), 1500);
  }

  verImagen(item: any) {
    this.imagenGrande = item.imagen;
  }

  cerrarImagen() {
    this.imagenGrande = null;
  }

  private normalizar(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
