import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food, FoodGroupBy } from '../models/food.model';
import { Observable } from 'rxjs';
import { Meal } from '../models/meal.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {
  private apiUrl = `${environment.apiRoot}/api/foods`;
  private apiMealUrl = `${environment.apiRoot}/api/meals`;

  constructor(private http: HttpClient) { }

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl);
  }

  getFood(foodId: string): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${foodId}`);
  }

  getFoodCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getFoodsByCategories(): Observable<FoodGroupBy[]> {
    return this.http.get<FoodGroupBy[]>(`${this.apiUrl}/groupBy/category`);
  }

  exportDrinks() {
    this.http.get(`${this.apiUrl}/export`, {headers: {'content-type': 'text/csv'}}).subscribe((data: any) => {
      console.log(data);
      const blob = new Blob([data], {type: 'text/csv'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
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

  // usage of any type for body => partial update (TODO modify Meal type)
  updateMeal(mealId: string, body: any): Observable<Meal> {
    return this.http.put<Meal>(`${this.apiMealUrl}/${mealId}`, body);
  }
}
