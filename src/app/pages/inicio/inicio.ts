import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent implements OnInit {
  imagenes = [
    '/foto.jpg',
    '/Cuidado.jpg',
    '/foto2.jpg'
  ];

  imagenActual = 0;

  ngOnInit() {
    setInterval(() => this.siguiente(), 5000);
  }

  siguiente() {
    this.imagenActual = (this.imagenActual + 1) % this.imagenes.length;
  }

  anterior() {
    this.imagenActual = (this.imagenActual - 1 + this.imagenes.length) % this.imagenes.length;
  }

  irACategorias() {
    const seccion = document.getElementById('categorias');
    if (seccion) {
      seccion.scrollIntoView({ behavior: 'smooth' });
    }
  }
}




