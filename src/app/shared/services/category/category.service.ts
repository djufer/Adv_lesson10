import { Injectable } from '@angular/core';
import { CategoryRequest, CategoryResponse } from '../../interfaces/interfaces';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = environment.BACKEND_URL;
  private api = {
    categories: `${this.url}/categories`,
  };

  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.api.categories);
  }
  createCategory(newCategory: CategoryRequest): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.api.categories, newCategory);
  }

  updateCategory(
    category: CategoryRequest,
    id: number
  ): Observable<CategoryResponse> {
    return this.http.patch<CategoryResponse>(
      `${this.api.categories}/${id}`,
      category
    );
  }
  removeCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.categories}/${id}`);
  }
}
