import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';
import { ProductoService } from '../../services/producto.service';

@Component({
  standalone: true,
  selector: 'app-macetas',
  imports: [CommonModule],
  templateUrl: './macetas.html',
  styleUrls: ['./macetas.css']
})
export class MacetasComponent implements OnInit {
  imagenGrande: string | null = null;
  productos: any[] = [];
  cargando = false;

  constructor(
    private cartService: CartService,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargando = true;
    this.productoService.obtenerProductos().subscribe((data: any[]) => {
      // Filtramos solo las macetas activas
      this.productos = data.filter(
        p => p.categoria === 'Macetas' && p.estado === 'activo'
      );
      this.cargando = false;
    });
  }

  sumarCantidad(producto: any) {
    producto.cantidad = (producto.cantidad || 1) + 1;
  }

  restarCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  anadirAlCarrito(producto: any) {
    this.cartService.agregar(producto, 'Macetas', producto.cantidad);
    producto.agregado = true;
    setTimeout(() => (producto.agregado = false), 2000);
  }

  verImagen(producto: any) {
    this.imagenGrande = producto.imagen;
  }

  cerrarImagen() {
    this.imagenGrande = null;
  }
}
