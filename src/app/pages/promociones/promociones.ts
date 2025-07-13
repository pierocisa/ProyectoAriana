import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promociones.html',
  styleUrls: ['./promociones.css']
})
export class PromocionesComponent {
  mensajeExito = false;

  promociones = [
    {
      categoria: 'Macetas',
      productos: [
        {
          nombre: 'Maceta Eco Grande',
          descripcion: 'Ecológica y resistente, ideal para interiores amplios.',
          precio: 25.99,
          precioAnterior: 34.99,
          imagen: '/maceta1.jpg'
        },
        {
          nombre: 'Maceta decorativa circular',
          descripcion: 'Acabado cerámico con texturas naturales.',
          precio: 19.50,
          precioAnterior: 25.00,
          imagen: '/maceta2.jpg'
        }
      ]
    },
    {
      categoria: 'Plantas',
      productos: [
        {
          nombre: 'Poto enredadera',
          descripcion: 'Fácil de cuidar y excelente para colgar.',
          precio: 21.50,
          precioAnterior: 29.90,
          imagen: '/planta1.jpg'
        },
        {
          nombre: 'Monstera Mini',
          descripcion: 'Ideal para decoración de escritorios con estilo.',
          precio: 29.99,
          precioAnterior: 39.99,
          imagen: '/planta2.jpg'
        }
      ]
    },
    {
      categoria: 'Cuidado',
      productos: [
        {
          nombre: 'Fertilizante Orgánico',
          descripcion: 'Nutriente completo para todo tipo de plantas.',
          precio: 18.50,
          precioAnterior: 23.00,
          imagen: '/fertilizante.jpg'
        },
        {
          nombre: 'Jabón potásico',
          descripcion: '100% natural, elimina plagas sin dañar la planta.',
          precio: 14.00,
          precioAnterior: 18.50,
          imagen: '/jabon.jpg'
        }
      ]
    }
  ];

  constructor(private cartService: CartService) {}

  anadirProducto(producto: any) {
    this.cartService.agregar(producto, 'promociones', 1);
    this.mensajeExito = true;
    setTimeout(() => this.mensajeExito = false, 2500);
  }
}

