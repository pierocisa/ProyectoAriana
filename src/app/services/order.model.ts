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
  fecha: Date;
  total: number;
  // opcionalmente añade:
  userId?: string;
}