import { Injectable } from '@angular/core';
import { ProductResponse, PromotionRequest } from '../../interfaces/interfaces';
import { from, Observable } from 'rxjs';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData, Firestore, getDoc, getDocs, query,
  updateDoc, where
} from '@angular/fire/firestore';
import { DocumentData } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public productsCollection: CollectionReference<DocumentData>;

  constructor(public afs: Firestore) {
    this.productsCollection = collection(this.afs, 'products');
  }

  getAllByCategory(name: string): Observable<ProductResponse[]> {
    const productsRef = collection(this.afs, 'products');
    const q = query(productsRef, where('category.path', '==', name));

    return from(
      getDocs(q).then(snapshot => {
        const products: ProductResponse[] = [];
        snapshot.forEach(doc => {
          products.push(doc.data() as ProductResponse);
        });
        return products;
      })
    );
  }

  async getOneById(id: string | null): Promise<ProductResponse | null> {
    if (!id) return Promise.resolve(null);
    const docRef = doc(this.afs, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as ProductResponse;
    } else {
      return null;
    }
  }

  getAllFirebase(){
    return collectionData(this.productsCollection, { idField: 'id'})
  }

  getOneFirebase(id: string){
    const productsDocumentReference = doc(this.afs, `products/${id}`);
    return docData(productsDocumentReference, { idField: 'id'})
  }

  createProductsFirebase(newPromotion: PromotionRequest)   {
    return addDoc(this.productsCollection, newPromotion)
  }

  updateProductsFirebase(promotion: PromotionRequest, id: string){
    const Promotion = doc(this.afs, `products/${id}`);
    return updateDoc(Promotion, {...promotion})
  }

  removeProductsFirebase(id: string){
    const productsDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productsDocumentReference);
  }
}
