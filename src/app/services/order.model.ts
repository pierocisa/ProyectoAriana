// src/app/services/order.model.ts
export interface Order {
  productos: Array<{
    id:       string;
    nombre:   string;
    precio:   number;
    cantidad: number;
  }>;

  cliente: {
    nombre:       string;
    apellido:     string;
    dni:          string;
    telefono:     string;
    departamento: string;
    provincia:    string;
    distrito:     string;
    direccion:    string;
    ciudad:       string;
    codigoPostal: string;
    comprobante:  string;
    guardar?:     boolean;
  };

  fecha: Date;             // Fecha y hora del pedido
  total: number;           // Total a pagar
  userId?: string;         // UID del usuario autenticado

  // 🔥 Nuevos campos opcionales para pagos
  comprobanteUrl?: string; // URL de la imagen subida como comprobante
  codigoPago?: string;     // Código de operación ingresado por cliente
  estadoPago?: 'pendiente' | 'aprobado' | 'rechazado'; // Estado del pago
}
