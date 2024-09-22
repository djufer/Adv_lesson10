import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CountOrderIDService {

  constructor(private firestore: Firestore) { }

  async getNextOrderID(): Promise<number> {
    const counterCollection = collection(this.firestore, 'currentOrderID');

    try {
      const querySnapshot = await getDocs(counterCollection);
      if (querySnapshot.empty) {
        throw new Error('No documents found in the collection');
      }
      const docSnapshot = querySnapshot.docs[0];
      let currentOrderID: number = 0;
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (data && typeof data['currentID'] === 'number') {
          currentOrderID = data['currentID'];
        } else {
          console.warn('currentOrderID is not a number or does not exist');
        }
      }
      currentOrderID++;
      const docRef = doc(this.firestore, 'currentOrderID', docSnapshot.id);
      await updateDoc(docRef, { currentID: currentOrderID });
      // Повернути нове значення
      return currentOrderID;
    } catch (error) {
      console.error('Error getting or updating document:', error);
      throw error;
    }
  }
}
