import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromocionService } from '../../../services/promocion.service';

@Component({
  standalone: true,
  selector: 'app-ofertas',
  imports: [CommonModule, FormsModule],
  templateUrl: './ofertas.html',
  styleUrls: ['./ofertas.css']
})
export class OfertasComponent implements OnInit {
  promociones: any[] = [];
  cargando = false;
  modalActivo = false;
  editandoId: string | null = null;
  nuevaPromocion: any = this.obtenerPromocionVacia();

  constructor(private promoService: PromocionService) {}

  ngOnInit() {
    this.cargarPromociones();
  }

  cargarPromociones() {
    this.cargando = true;
    this.promoService.obtenerPromociones().subscribe({
      next: (data: any[]) => {
        this.promociones = data;
        this.cargando = false;
      },
      error: err => {
        console.error('❌ Error al cargar promociones:', err);
        this.cargando = false;
      }
    });
  }

  abrirModal(promo?: any) {
    this.modalActivo = true;
    if (promo) {
      this.editandoId = promo.id;
      this.nuevaPromocion = { ...promo };
    } else {
      this.editandoId = null;
      this.nuevaPromocion = this.obtenerPromocionVacia();
    }
  }

  cerrarModal() {
    this.modalActivo = false;
    this.editandoId = null;
  }

  async guardarPromocion() {
    if (this.nuevaPromocion.titulo.trim() && this.nuevaPromocion.descuento >= 0) {
      try {
        if (this.editandoId) {
          await this.promoService.actualizarPromocion(this.editandoId, this.nuevaPromocion);
          alert('✅ Promoción actualizada correctamente.');
        } else {
          await this.promoService.agregarPromocion(this.nuevaPromocion);
          alert('✅ Promoción agregada correctamente.');
        }
        this.cerrarModal();
        this.cargarPromociones();
      } catch (err) {
        console.error('❌ Error al guardar promoción:', err);
      }
    } else {
      alert('⚠️ Completa todos los campos requeridos.');
    }
  }

  eliminarPromocion(promo: any) {
    if (confirm('❌ ¿Seguro que deseas eliminar esta promoción?')) {
      this.promoService.eliminarPromocion(promo.id).then(() => {
        alert('✅ Promoción eliminada.');
        this.cargarPromociones();
      });
    }
  }

  cargarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.nuevaPromocion.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  obtenerPromocionVacia() {
    return {
      titulo: '',
      descripcion: '',
      descuento: 0,
      imagen: ''
    };
  }
}
