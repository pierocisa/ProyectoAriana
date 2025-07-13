import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class CartService {
  private carrito: any[] = [];
  

  agregar(producto: any, categoria: string, cantidad: number) {
    const copia = { ...producto, categoria, cantidad };
    this.carrito.push(copia);
    
  }

  obtenerCarrito() {
    return this.carrito;
  }

  eliminar(index: number) {
    this.carrito.splice(index, 1);
    
  }

  vaciar() {
    this.carrito = [];
    
  }
}



