import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CountOrderIDService {

  constructor(private firestore: Firestore) { }

  async getNextOrderID(): Promise<number> {
    // Вказати колекцію
    const counterCollection = collection(this.firestore, 'currentOrderID');

    try {
      // Отримати всі документи з колекції
      const querySnapshot = await getDocs(counterCollection);
      if (querySnapshot.empty) {
        throw new Error('No documents found in the collection');
      }

      // Отримати перший документ з колекції
      const docSnapshot = querySnapshot.docs[0];
      let currentOrderID: number = 0;

      // Перевірити, чи документ існує
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        // Перевірити наявність і тип значення
        if (data && typeof data['currentID'] === 'number') {
          currentOrderID = data['currentID'];
        } else {
          console.warn('currentOrderID is not a number or does not exist');
        }
      }

      // Інкрементувати значення
      currentOrderID++;

      // Оновити документ
      const docRef = doc(this.firestore, 'currentOrderID', docSnapshot.id);
      await updateDoc(docRef, { currentID: currentOrderID });
      // Повернути нове значення
      return currentOrderID;
    } catch (error) {
      console.error('Error getting or updating document:', error);
      throw error; // Можна обробити помилку по-різному в залежності від ваших вимог
    }
  }
}
