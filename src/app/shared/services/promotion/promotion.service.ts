import { Injectable } from '@angular/core';
import {ProductResponse, PromotionRequest, PromotionResponse} from '../../interfaces/interfaces';

import {
  addDoc,
  collection,
  collectionData,
  CollectionReference, deleteDoc,
  doc,
  docData,
  Firestore, getDoc, updateDoc
} from "@angular/fire/firestore";
import { DocumentData } from "@angular/fire/compat/firestore";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  public promotionCollection: CollectionReference<DocumentData>;

  constructor(
    public afs: Firestore,

  ) {
    this.promotionCollection = collection(this.afs, 'promotions');
  }
  // getAll(): Observable<PromotionResponse[]> {
  //   return this.http.get<PromotionResponse[]>(this.api.promotions);
  // }
  // getOne(id: number): Observable<PromotionResponse> {
  //   return this.http.get<PromotionResponse>(`${this.api.promotions}/${id}`);
  // }
  // addNewPromotion(promotion: PromotionRequest): Observable<PromotionResponse> {
  //   return this.http.post<PromotionResponse>(this.api.promotions, promotion);
  // }
  // removePromotion(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.api.promotions}/${id}`);
  // }
  // updatePromotion(newObj: PromotionRequest, id: number): Observable<void> {
  //   return this.http.patch<void>(`${this.api.promotions}/${id}`, newObj);
  // }
//   --------------------------- F I R E B A S E ---------------------------

  getAllFirebase(){
    return collectionData(this.promotionCollection, { idField: 'id'})
  }

  async getOneFirebase(id: string) {
    if (!id) return Promise.resolve(null);

    const promotionsDocumentReference = doc(this.afs, `promotions/${id}`);
    const data = await firstValueFrom(docData(promotionsDocumentReference, {idField: 'id'}));
    return data as PromotionResponse || null; // Ensure correct type
  }



  createPromotionFirebase(newPromotion: PromotionRequest)   {
    return addDoc(this.promotionCollection, newPromotion)
  }

  updatePromotionFirebase(promotion: PromotionRequest, id: string){
    const Promotion = doc(this.afs, `promotions/${id}`);
    return updateDoc(Promotion, {...promotion})
  }

  removePromotionFirebase(id: string){
    const promotionDocumentReference = doc(this.afs, `promotions/${id}`);
    return deleteDoc(promotionDocumentReference);
  }


}
