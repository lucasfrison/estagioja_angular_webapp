import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Frase } from '../shared/models/frase.model';

@Injectable({
  providedIn: 'root'
})
export class FraseService {

  private apiUrl = 'https://localhost:7238/frase';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  buscarPorIdEmpresa(id: number): Observable<Frase> {
    return this.http.get<Frase>(`${this.apiUrl}/empresa/${id}`);  
  }

  buscarPorIdEstudante(id: number): Observable<Frase> {
    return this.http.get<Frase>(`${this.apiUrl}/estudante/${id}`);  
  }
  
}
