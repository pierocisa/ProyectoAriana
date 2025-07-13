import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { PromocionService } from '../../services/promocion.service';

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promociones.html',
  styleUrls: ['./promociones.css']
})
export class PromocionesComponent implements OnInit {
  mensajeExito = false;
  promociones: any[] = []; // 🔥 Ahora cargadas dinámicamente
  cargando = true; // ⏳ Mostrar loader mientras carga

  private cartService = inject(CartService);
  private promocionService = inject(PromocionService);

  ngOnInit() {
    this.promocionService.obtenerPromociones().subscribe({
      next: (data: any[]) => {
        console.log('🎁 Promociones obtenidas:', data);
        this.promociones = this.organizarPorCategoria(data);
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar promociones:', err);
        this.cargando = false;
      }
    });
  }

  /**
   * Agrupa las promociones por categoría para la vista
   */
  private organizarPorCategoria(data: any[]): any[] {
    const categoriasMap: { [key: string]: any[] } = {};

    data.forEach(promo => {
      const categoria = promo.categoria || 'Otras';
      if (!categoriasMap[categoria]) {
        categoriasMap[categoria] = [];
      }
      categoriasMap[categoria].push(promo);
    });

    // Convierte el mapa en un array para la vista
    return Object.keys(categoriasMap).map(cat => ({
      categoria: cat,
      productos: categoriasMap[cat]
    }));
  }

  /**
   * Añade un producto al carrito
   */
  anadirProducto(producto: any) {
    this.cartService.agregar(producto, 'promociones', 1);
    this.mensajeExito = true;

    setTimeout(() => this.mensajeExito = false, 2500); // Oculta el mensaje luego de 2.5s
  }
}
