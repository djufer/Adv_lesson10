import { Injectable } from '@angular/core';
import { CategoryRequest } from '../../interfaces/interfaces';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference, deleteDoc,
  doc,
  Firestore,
  updateDoc
} from '@angular/fire/firestore';
import { DocumentData } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryCollection: CollectionReference<DocumentData>;

  constructor(
    public afs: Firestore,
  ) {
    this.categoryCollection = collection(this.afs, 'categories');
  }

  getAllFirebase() {
    return collectionData(this.categoryCollection, {idField: 'id'})
  }

  createCategoryFirebase(newCategory: CategoryRequest)   {
    return addDoc(this.categoryCollection, newCategory)
  }

  updateCategoryFirebase(category: CategoryRequest, id: string){
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReference, {...category})
  }

  removeCategoryFirebase(id: string){
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReference);
  }

}
