import { HttpClient } from "@angular/common/http";
import { Vaga } from "../shared/models/vaga.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Curso } from "../shared/models/curso.model";

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private apiUrl = 'https://localhost:7238/curso'; // URL da API

  constructor(private http: HttpClient) { }

  // Método para obter todas as vagas
  buscarTodos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  // Método para criar uma nova vaga
  inserir(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }
}