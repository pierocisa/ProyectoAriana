import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  standalone: true,
  selector: 'app-sustratos',
  imports: [CommonModule],
  templateUrl: './sustractos.html',
  styleUrls: ['./sustractos.css']
})
export class SustractosComponent {
  imagenGrande: string | null = null;

  productos = [
    {
      nombre: 'Sustrato Universal 5L',
      descripcion: 'Ideal para plantas de interior y exterior. Mejora drenaje y nutrición.',
      precio: 18.0,
      imagen: '/sustrato-universal.jpg',
      cantidad: 1,
      agregado: false
    },
    {
      nombre: 'Fibra de Coco',
      descripcion: 'Ligera, ecológica y excelente para mantener la humedad en tus macetas.',
      precio: 15.0,
      imagen: '/fibra-coco.jpg',
      cantidad: 1,
      agregado: false
    }
  ];

  constructor(private cartService: CartService, private router: Router) {}

  sumarCantidad(producto: any) {
    producto.cantidad++;
  }

  restarCantidad(producto: any) {
    if (producto.cantidad > 1) producto.cantidad--;
  }

  anadirAlCarrito(producto: any) {
    this.cartService.agregar(producto, 'Sustractos', producto.cantidad);
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


