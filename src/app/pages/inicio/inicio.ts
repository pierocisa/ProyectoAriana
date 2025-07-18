import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ RouterLink, NgIf, NgFor ],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent implements OnInit {
  // 📂 Asegúrate de que estas imágenes existen en src/assets/img/
  imagenes = [
    'assets/img/foto.jpg',
    'assets/img/Cuidado.jpg',
    'assets/img/foto2.jpg',
    'ssets/img/ari.jpg',
    'assets/img/macetas.jpeg',
    'assets/img/sustratos.jpg'
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
