import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CartService } from '../../services/cart';

@Component({
  standalone: true,
  selector: 'app-paquetes',
  imports: [CommonModule],
  templateUrl: './paquetes.html',
  styleUrls: ['./paquetes.css']
})
export class PaquetesComponent implements OnInit {
  productos: any[] = [];
  imagenGrande: string | null = null;
  cargando: boolean = true;

  constructor(
    private productoService: ProductoService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productoService.obtenerProductos().subscribe((data: any[]) => {
      this.productos = data.filter(
        (p) => p.categoria === 'Paquetes' && p.estado === 'activo'
      );
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
    this.cartService.agregar(item, 'Paquetes', item.cantidad);
    item.agregado = true;
    setTimeout(() => (item.agregado = false), 2000);
  }

  verImagen(item: any) {
    this.imagenGrande = item.imagen;
  }

  cerrarImagen() {
    this.imagenGrande = null;
  }
}
