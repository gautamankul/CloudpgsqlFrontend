import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schema } from '../models/connections';
import { Column, Table } from '../models/connections';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchemaService {
  private apiUrl = `${environment.apiUrl}/schemas`;

  constructor(private http: HttpClient) {}

  getSchemas(): Observable<Schema[]> {
    return this.http.get<Schema[]>(this.apiUrl);
  }

  getSchema(id: number): Observable<Schema> {
    return this.http.get<Schema>(`${this.apiUrl}/${id}`);
  }

  createSchema(schema: Schema): Observable<Schema> {
    return this.http.post<Schema>(this.apiUrl, schema);
  }

  updateSchema(schema: Schema): Observable<Schema> {
    return this.http.put<Schema>(`${this.apiUrl}/${schema.id}`, schema);
  }

  deleteSchema(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getTables(schemaId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${schemaId}/tables`);
  }

  createTable(
    schemaId: number,
    tableName: string,
    columns: Column[]
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/${schemaId}/create_table`, {
      table_name: tableName,
      columns: columns,
    });
  }
}
