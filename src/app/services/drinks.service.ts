import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drink } from '../models/drink.model';
import { Round } from '../models/round.model';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {
  private apiUrl = 'http://localhost:3000/api/drinks';
  private apiRoundUrl = 'http://localhost:3000/api/rounds';

  constructor(private http: HttpClient) { }

  getDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.apiUrl);
  }

  getDrink(drinkId: string): Observable<Drink> {
    return this.http.get<Drink>(`${this.apiUrl}/${drinkId}`);
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
}
