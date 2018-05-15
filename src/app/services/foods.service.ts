import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from '../models/food.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {
  private apiUrl = 'http://localhost:3000/api/foods';

  constructor(private http: HttpClient) { }

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl);
  }

  getFood(foodId: string): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${foodId}`);
  }

  saveFood(body: Food): Observable<any> {
    return this.http.post(this.apiUrl, body);
  }

  updateFood(foodId: string, body: Food): Observable<Food> {
    return this.http.put<Food>(`${this.apiUrl}/${foodId}`, body);
  }

  deleteFood(foodId: string): Observable<Food> {
    return this.http.delete<Food>(`${this.apiUrl}/${foodId}`);
  }
}
