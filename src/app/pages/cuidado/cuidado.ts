import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  standalone: true,
  selector: 'app-cuidado',
  imports: [CommonModule],
  templateUrl: './cuidado.html',
  styleUrls: ['./cuidado.css']
})
export class CuidadoComponent {
  imagenGrande: string | null = null;

  productos = [
    {
      nombre: 'Fertilizante Universal',
      descripcion: 'Mejora el crecimiento de tus plantas con nutrientes esenciales.',
      precio: 18.0,
      imagen: '/botiquin.jpg',
      cantidad: 1,
      agregado: false
    },
    {
      nombre: 'Carbon Mini',
      descripcion: 'Ideal para macetas y jardines, retiene humedad de forma natural.',
      precio: 15.5,
      imagen: '/Cuidado.jpg',
      cantidad: 1,
      agregado: false
    },


  {
      nombre: 'Jabon Potásico',
      descripcion: 'Ideal para macetas y jardines, retiene humedad de forma natural.',
      precio: 15.5,
      imagen: '/jabon.jpg',
      cantidad: 1,
      agregado: false
    },
    {
      nombre: 'Enraizante',
      descripcion: 'Ideal para macetas y jardines, retiene humedad de forma natural.',
      precio: 15.5,
      imagen: '/enraizante..jpg',
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
    this.cartService.agregar(producto, 'Cuidado', producto.cantidad);
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

