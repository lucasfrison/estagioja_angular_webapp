import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Vaga } from "../shared/models/vaga.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class VagaService {

  private apiUrl = 'https://localhost:7238/Vaga'; // URL da API

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  buscarTodos(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.apiUrl);
  }

  inserir(vaga: Vaga): Observable<Vaga> {
    return this.http.post<Vaga>(this.apiUrl, vaga, {headers: this.headers});
  }

  alterar(vaga: Vaga): Observable<Vaga> {
    return this.http.put<Vaga>(this.apiUrl, vaga, {headers: this.headers});
  }

  buscarPorId(id: number): Observable<Vaga> {
    return this.http.get<Vaga>(`${this.apiUrl}/${id}`);   
  }
}