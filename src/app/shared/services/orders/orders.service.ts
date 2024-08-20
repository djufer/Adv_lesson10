import { Injectable } from '@angular/core';
import {  OrderResponse } from '../../interfaces/interfaces';
import { Subject } from 'rxjs';
import {
  Firestore,
  collection,
  addDoc,
  CollectionReference,
  query,
  where,
  getDocs,
  Timestamp,
  updateDoc, doc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  public changeBasket = new Subject<boolean>();

  public ordersCollection: CollectionReference<OrderResponse>;
  constructor(private afs: Firestore) {
    // Створюємо посилання на колекцію 'orders'
    this.ordersCollection = collection(this.afs, 'orders') as CollectionReference<OrderResponse>;
  }

// Додаємо замовлення в колекцію 'orders' і додаємо ID до самого ордера
  async addOrder(order: OrderResponse): Promise<void> {
    try {
      const orderDocRef = await addDoc(this.ordersCollection, order);
    } catch (error) {
      console.error('Error adding order: ', error);
      throw error; // Передаємо помилку далі, щоб її можна було обробити в компоненті
    }
  }



  async getOrdersById(id: string): Promise<OrderResponse[]> {
    try {
      const q = query(
        this.ordersCollection,
        where('userId', '==', id)
      );

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => {
        const data = doc.data() as OrderResponse;
        if (data.orderDate instanceof Timestamp) {
          data.orderDate = data.orderDate.toDate(); // Перетворюємо Timestamp на Date
        }
        return data;
      });
    } catch (error) {
      console.error('Error fetching orders by user ID: ', error);
      throw error;
    }
  }
}
