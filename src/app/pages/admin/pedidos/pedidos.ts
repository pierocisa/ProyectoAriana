import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.css']
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];

  // Modal de edición o visualización
  modalActivo = false;
  modoLectura = false; // true = solo ver, false = editar
  pedidoEditando: any = null;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  /** Obtener pedidos desde el servicio */
  obtenerPedidos() {
    this.pedidoService.obtenerPedidos().subscribe((data: any[]) => {
      this.pedidos = data.map((pedido: any) => ({
        id: pedido.id,
        cliente: pedido.cliente || { nombre: 'Sin nombre', apellido: '' },
        telefono: pedido.cliente?.telefono || 'No registrado',
        direccion: pedido.cliente?.direccion || 'No registrada',
        // ✅ Corregido: busca codigoPago en cliente primero
        codigoPago: pedido.cliente?.codigoPago || pedido.codigoPago || 'No ingresado',
        estado: pedido.estado?.toUpperCase() || 'PENDIENTE'
      }));
    });
  }

  /** Abrir modal en modo solo lectura */
  verDetalles(pedido: any) {
    this.modoLectura = true;
    this.pedidoEditando = { ...pedido };
    this.modalActivo = true;
  }

  /** Abrir modal en modo edición */
  abrirModal(pedido: any) {
    this.modoLectura = false;
    this.pedidoEditando = { ...pedido };
    this.modalActivo = true;
  }

  /** Cerrar el modal */
  cerrarModal() {
    this.modalActivo = false;
    this.pedidoEditando = null;
    this.modoLectura = false;
  }

  /** Eliminar un pedido */
  eliminarPedido(id: string) {
    if (confirm('🗑️ ¿Estás seguro de que deseas eliminar este pedido? Esta acción no se puede deshacer.')) {
      this.pedidoService.eliminarPedido(id).then(() => {
        alert('✅ Pedido eliminado correctamente.');
        this.obtenerPedidos(); // Recarga la lista después de eliminar
      }).catch(error => {
        console.error('❌ Error al eliminar el pedido:', error);
        alert('⚠️ No se pudo eliminar el pedido. Intenta nuevamente.');
      });
    }
  }

  /** Guardar cambios desde el modal */
  guardarCambiosPedido() {
    if (!this.pedidoEditando?.id) return;

    this.pedidoService.actualizarPedido(this.pedidoEditando.id, {
      estado: this.pedidoEditando.estado
    }).then(() => {
      alert('✅ Estado actualizado correctamente');
      this.cerrarModal();
      this.obtenerPedidos();
    }).catch(err => {
      console.error('❌ Error al actualizar:', err);
      alert('⚠️ No se pudo actualizar el estado del pedido');
    });
  }

  /** 🆕 Validar pedido y marcar como ENVIADO */
  validarPedido(id: string) {
    if (confirm('✅ ¿Confirmas que el pago ha sido validado y el pedido será marcado como ENVIADO?')) {
      this.pedidoService.actualizarPedido(id, { estado: 'ENVIADO' })
        .then(() => {
          alert('🚚 Pedido validado y marcado como ENVIADO.');
          this.obtenerPedidos(); // Recargar lista
        })
        .catch(err => {
          console.error('❌ Error al validar pedido:', err);
          alert('⚠️ No se pudo validar el pedido');
        });
    }
  }
}
