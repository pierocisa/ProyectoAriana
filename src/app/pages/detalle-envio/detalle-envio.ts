import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';

@Component({
  standalone: true,
  selector: 'app-detalle-envio',
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-envio.html',
  styleUrls: ['./detalle-envio.css']
})
export class DetalleEnvioComponent implements OnInit {
  carrito: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.carrito = this.cartService.obtenerCarrito();
  }

  get subtotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  get igv(): number {
    return +(this.subtotal * 0.10).toFixed(2); // Podés ajustar el % aquí
  }

  get total(): number {
    return +(this.subtotal + this.igv).toFixed(2);
  }

  eliminarItem(index: number): void {
    this.carrito.splice(index, 1);
  }

  enviarFormulario(): void {
    alert('✅ Formulario enviado correctamente');
    // this.router.navigate(['/metodo-pago']); // si vas a redirigir luego
  }
}

