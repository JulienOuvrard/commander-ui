import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drink, DrinkGroupBy } from '../models/drink.model';
import { Round } from '../models/round.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {
  private apiUrl = `${environment.apiRoot}/api/drinks`;
  private apiRoundUrl = `${environment.apiRoot}/api/rounds`;

  constructor(private http: HttpClient) { }

  getDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.apiUrl);
  }

  getDrink(drinkId: string): Observable<Drink> {
    return this.http.get<Drink>(`${this.apiUrl}/${drinkId}`);
  }

  getDrinkCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getDrinksByCategories(): Observable<DrinkGroupBy[]> {
    return this.http.get<DrinkGroupBy[]>(`${this.apiUrl}/groupBy/category`);
  }

  exportDrinks() {
    this.http.get(`${this.apiUrl}/export`, {headers: {'content-type': 'text/csv'}}).subscribe((data: any) => {
      console.log(data);
      const blob = new Blob([data], {type: 'text/csv'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  saveDrink(body: Drink): Observable<any> {
    return this.http.post(this.apiUrl, body);
  }

  updateDrink(drinkId: string, body: Drink): Observable<Drink> {
    return this.http.put<Drink>(`${this.apiUrl}/${drinkId}`, body);
  }

  deleteDrink(drinkId: string): Observable<Drink> {
    return this.http.delete<Drink>(`${this.apiUrl}/${drinkId}`);
  }

  importDrinks(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/import`, formData);
  }

  saveDrinkSelection(body: Round): Observable<any> {
    return this.http.post(this.apiRoundUrl, body);
  }

  getRound(roundId: string): Observable<Round> {
    return this.http.get<Round>(`${this.apiRoundUrl}/${roundId}`);
  }

  // usage of any type for body => partial update (TODO modify Round type)
  updateRound(roundId: string, body: any): Observable<Round> {
    return this.http.put<Round>(`${this.apiRoundUrl}/${roundId}`, body);
  }
}
