import { Injectable } from '@angular/core';
import { ProductResponse, ProductRequest } from './../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = environment.BACKEND_URL;
  private api = {
    products: `${this.url}/products`,
  };

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.api.products);
  }

  getAllByCategory(name: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${this.api.products}?category.path=${name}`
    );
  }
  getAllBySubCategory(name: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${this.api.products}?subCategory.path=${name}`
    );
  }

  getOne(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.api.products}/${id}`);
  }

  addNewProduct(product: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.api.products, product);
  }

  removeProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`);
  }
  updateProduct(
    newProduct: ProductRequest,
    id: number
  ): Observable<ProductResponse> {
    return this.http.patch<ProductResponse>(
      `${this.api.products}/${id}`,
      newProduct
    );
  }
}
