// src/app/services/order.service.ts
import { Injectable }                 from '@angular/core';
import { Firestore, collection, addDoc, CollectionReference } from '@angular/fire/firestore';
import { Order }                      from './order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private ordersCol!: CollectionReference;  // <- no inicializar aquí

  constructor(private fs: Firestore) {
    // Inicializa ordersCol usando this.fs dentro del constructor
    this.ordersCol = collection(this.fs, 'orders');
  }

  crearPedido(order: Order) {
    return addDoc(this.ordersCol, order);
  }
}