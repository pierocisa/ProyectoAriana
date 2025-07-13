import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  standalone: true,
  selector: 'app-macetas',
  imports: [CommonModule],
  templateUrl: './macetas.html',
  styleUrls: ['./macetas.css']
})
export class MacetasComponent {
  imagenGrande: string | null = null;

  productos = [
    {
      nombre: 'Maceta Rústica',
      descripcion: 'Diseño artesanal, perfecta para plantas medianas.',
      precio: 35.0,
      imagen: '/maceta1.jpg',
      cantidad: 1,
      agregado: false
    },
    {
      nombre: 'Maceta de Cerámica ',
      descripcion: 'Elegante y minimalista, ideal para interiores modernos.',
      precio: 42.0,
      imagen: '/maceta2.jpg',
      cantidad: 1,
      agregado: false
    },
    {
      nombre: 'Maceta Colgante Eco',
      descripcion: 'Material reciclado y resistente, para colgar en balcones.',
      precio: 29.0,
      imagen: '/maceta3.jpg',
      cantidad: 1,
      agregado: false
    }
  ];

  constructor(private cartService: CartService, private router: Router) {}

  sumarCantidad(producto: any) {
    producto.cantidad++;
  }

  restarCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  anadirAlCarrito(producto: any) {
    this.cartService.agregar(producto, 'Macetas', producto.cantidad);
    producto.agregado = true;

    setTimeout(() => {
      producto.agregado = false;
    }, 2000);
  }

  verImagen(producto: any) {
    this.imagenGrande = producto.imagen;
  }

  cerrarImagen() {
    this.imagenGrande = null;
  }
}

