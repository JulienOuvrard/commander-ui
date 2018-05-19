import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from '../models/food.model';
import { Observable } from 'rxjs';
import { Meal } from '../models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {
  private apiUrl = 'http://localhost:3000/api/foods';
  private apiMealUrl = 'http://localhost:3000/api/meals';

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

  importFoods(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/import`, formData);
  }

  saveFoodSelection(body: Meal): Observable<any> {
    return this.http.post(this.apiMealUrl, body);
  }

  getMeal(mealId: string): Observable<Meal> {
    return this.http.get<Meal>(`${this.apiMealUrl}/${mealId}`);
  }
}
