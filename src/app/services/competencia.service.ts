import { HttpClient } from "@angular/common/http";
import { Vaga } from "../shared/models/vaga.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Competencia } from "../shared/models/competencia.model";

@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {

  private apiUrl = 'https://estagiojaapi.azurewebsites.net/competencia'; // URL da API

  constructor(private http: HttpClient) { }

  // Método para obter todas as vagas
  buscarTodos(): Observable<Competencia[]> {
    return this.http.get<Competencia[]>(this.apiUrl);
  }

  // Método para criar uma nova vaga
  inserir(competencia: Competencia): Observable<Competencia> {
    return this.http.post<Competencia>(this.apiUrl, competencia);
  }
}
