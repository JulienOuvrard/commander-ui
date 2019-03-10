import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Round } from '../models/round.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoundsService {
  private apiUrl = `${environment.apiRoot}/api/rounds`;

  constructor(private http: HttpClient) { }

  getRounds(): Observable<Round[]> {
    return this.http.get<Round[]>(this.apiUrl);
  }

  getRound(roundId: string): Observable<Round> {
    return this.http.get<Round>(`${this.apiUrl}/${roundId}`);
  }

  saveRound(body: Round): Observable<any> {
    return this.http.post(this.apiUrl, body);
  }

  // usage of any type for body => partial update (TODO modify Round type)
  updateRound(roundId: string, body: any): Observable<Round> {
    return this.http.put<Round>(`${this.apiUrl}/${roundId}`, body);
  }

  deleteRound(roundId: string): Observable<Round> {
    return this.http.delete<Round>(`${this.apiUrl}/${roundId}`);
  }
}
