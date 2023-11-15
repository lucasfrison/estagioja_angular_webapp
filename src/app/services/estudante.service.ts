import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../shared/models/empresa.model';
import { Observable } from "rxjs";
import { Estudante } from '../shared/models/estudante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudanteService {
  private apiUrl = 'https://localhost:7238/estudante';
  
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  buscarPorId(id: number): Observable<Estudante> {
    return this.http.get<Estudante>(`${this.apiUrl}/${id}`);  
  }

  atualizarEstudante(estudante: Estudante) {
    return this.http.put<Estudante>(this.apiUrl, estudante);
  }

}
