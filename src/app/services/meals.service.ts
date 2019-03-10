import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meal } from '../models/meal.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private apiUrl = `${environment.apiRoot}/api/meals`;

  constructor(private http: HttpClient) { }

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.apiUrl);
  }

  getMeal(mealId: string): Observable<Meal> {
    return this.http.get<Meal>(`${this.apiUrl}/${mealId}`);
  }

  saveMeal(body: Meal): Observable<any> {
    return this.http.post(this.apiUrl, body);
  }

  // usage of any type for body => partial update (TODO modify Meal type)
  updateMeal(mealId: string, body: any): Observable<Meal> {
    return this.http.put<Meal>(`${this.apiUrl}/${mealId}`, body);
  }

  deleteMeal(mealId: string): Observable<Meal> {
    return this.http.delete<Meal>(`${this.apiUrl}/${mealId}`);
  }
}
