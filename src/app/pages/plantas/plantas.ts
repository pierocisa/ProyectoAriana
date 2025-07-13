import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  standalone: true,
  selector: 'app-plantas',
  imports: [CommonModule],
  templateUrl: './plantas.html',
  styleUrls: ['./plantas.css']
})
export class PlantasComponent {
  imagenGrande: string | null = null;

  productos = [
    {
      nombre: 'ORQUÍDEA',
      descripcion: 'Planta de origen tropical ideal para interiores, sus flores simétricas y duraderas pueden florecer varias veces al año con los cuidados adecuados.',
      precio: 50.0,
      imagen: '/IMG_2449.jpeg',
      cantidad: 1,
      agregado: false
    },
    {
      nombre: 'MONSTERA',
      descripcion: 'Planta de hojas grandes y aspecto exótico, perfecta para ambientes interiores luminosos.',
      precio: 45.0,
      imagen: '/monstera.jpg',
      cantidad: 1,
      agregado: false
    },
    {
      nombre: 'CACTUS DECORATIVO',
      descripcion: 'Requiere muy poca agua y luz indirecta. Ideal para espacios modernos y minimalistas.',
      precio: 25.0,
      imagen: '/cactus.jpg',
      cantidad: 1,
      agregado: false
    }
  ];

  constructor(private cartService: CartService, private router: Router) {}

  sumarCantidad(planta: any) {
    planta.cantidad++;
  }

  restarCantidad(planta: any) {
    if (planta.cantidad > 1) {
      planta.cantidad--;
    }
  }

  anadirAlCarrito(planta: any) {
    this.cartService.agregar(planta, 'Plantas', planta.cantidad);
    planta.agregado = true;

    setTimeout(() => {
      planta.agregado = false;
    }, 2000);
  }

  verImagen(planta: any) {
    this.imagenGrande = planta.imagen;
  }

  cerrarImagen() {
    this.imagenGrande = null;
  }
}






