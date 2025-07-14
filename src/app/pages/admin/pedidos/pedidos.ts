import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Importa CommonModule
import { PedidoService } from '../../../services/pedido.service'; // ✅ Importa PedidoService bien

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule], // ✅ Agrega CommonModule
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.css']
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService) {} // ✅ Usa PedidoService

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.pedidoService.obtenerPedidos().subscribe((data: any[]) => {
      this.pedidos = data.map((pedido: any) => ({
        id: pedido.id,
        cliente: pedido.cliente || { nombre: 'Sin nombre', apellido: '' },
        telefono: pedido.cliente?.telefono || 'No registrado',
        direccion: pedido.cliente?.direccion || 'No registrada',
        estado: pedido.estado || 'Pendiente'
      }));
    });
  }

  verDetalles(pedido: any) {
    console.log('📦 Detalles del pedido:', pedido);
    alert(`
      Cliente: ${pedido.cliente.nombre} ${pedido.cliente.apellido}
      Teléfono: ${pedido.telefono}
      Dirección: ${pedido.direccion}
      Estado: ${pedido.estado}
    `);
  }

  eliminarPedido(id: string) {
    if (confirm('¿Seguro que quieres eliminar este pedido?')) {
      this.pedidoService.eliminarPedido(id).then(() => {
        alert('Pedido eliminado correctamente ✅');
        this.obtenerPedidos(); // 🔄 Refresca lista
      });
    }
  }
}
