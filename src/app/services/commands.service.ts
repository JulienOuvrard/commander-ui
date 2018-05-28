import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Command } from '../models/command.model';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {
  private apiUrl = 'http://localhost:3000/api/commands';

  constructor(private http: HttpClient) { }

  getCommands(): Observable<Command[]> {
    return this.http.get<Command[]>(this.apiUrl);
  }

  getCommand(commandId: string): Observable<Command> {
    return this.http.get<Command>(`${this.apiUrl}/${commandId}`);
  }

  getCommandDescription(commandId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${commandId}/description`);
  }

  saveCommand(body: Command): Observable<any> {
    return this.http.post(this.apiUrl, body);
  }

  updateCommand(commandId: string, body: Command): Observable<Command> {
    return this.http.put<Command>(`${this.apiUrl}/${commandId}`, body);
  }

  deleteCommand(commandId: string): Observable<Command> {
    return this.http.delete<Command>(`${this.apiUrl}/${commandId}`);
  }

  printCommand(commandId: string, body): Observable<any> {
    return this.http.post(`${this.apiUrl}/${commandId}/print`, body);
  }
}
