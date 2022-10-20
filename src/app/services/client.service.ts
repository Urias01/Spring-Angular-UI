import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Client> {
    return this.http.get<Client>(`${API_CONFIG.baseUrl}/Clients/${id}`)
  }

  findAll(): Observable<Client[]> {
    return this.http.get<Client[]>(`${API_CONFIG.baseUrl}/clientes`);
  }

  create(Client: Client): Observable<Client> {
    return this.http.post<Client>(`${API_CONFIG.baseUrl}/clientes`, Client);
  }

  update(Client: Client): Observable<Client> {
    return this.http.put<Client>(`${API_CONFIG.baseUrl}/clientes/${Client.id}`, Client)
  }

  delete(id: any): Observable<Client> {
    return this.http.delete<Client>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }
}
