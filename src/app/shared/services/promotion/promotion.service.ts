import { Injectable } from '@angular/core';
import { PromotionResponse, PromotionRequest } from '../../interfaces/interfaces';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  private url = environment.BACKEND_URL;
  private api = {
    promotions: `${this.url}/promotions`,
  };
  constructor(private http: HttpClient) {}
  getAll(): Observable<PromotionResponse[]> {
    return this.http.get<PromotionResponse[]>(this.api.promotions);
  }
  getOne(id: number): Observable<PromotionResponse> {
    return this.http.get<PromotionResponse>(`${this.api.promotions}/${id}`);
  }
  addNewPromotion(promotion: PromotionRequest): Observable<PromotionResponse> {
    return this.http.post<PromotionResponse>(this.api.promotions, promotion);
  }
  removePromotion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.promotions}/${id}`);
  }
  updatePromotion(newObj: PromotionRequest, id: number): Observable<void> {
    return this.http.patch<void>(`${this.api.promotions}/${id}`, newObj);
  }
}
