import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatabaseConnection } from '../models/connections';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private apiUrl = `${environment.apiUrl}/connections`;

  constructor(private http: HttpClient) { }

  getConnections(): Observable<DatabaseConnection[]> {
    return this.http.get<DatabaseConnection[]>(this.apiUrl);
  }

  getConnection(id: number): Observable<DatabaseConnection> {
    return this.http.get<DatabaseConnection>(`${this.apiUrl}/${id}`);
  }

  createConnection(connection: DatabaseConnection): Observable<DatabaseConnection> {
    return this.http.post<DatabaseConnection>(this.apiUrl, connection);
  }

  updateConnection(connection: DatabaseConnection): Observable<DatabaseConnection> {
    return this.http.put<DatabaseConnection>(`${this.apiUrl}/${connection.id}`, connection);
  }

  deleteConnection(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
