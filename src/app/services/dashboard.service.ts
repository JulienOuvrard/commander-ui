import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiRoot}/api/dashboard`;

  constructor(private http: HttpClient) { }

  getCommandsStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/commands/paid`);
  }
}
