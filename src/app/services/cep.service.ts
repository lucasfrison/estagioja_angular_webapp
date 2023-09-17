import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../shared/models/endereco.model';

@Injectable({
  providedIn: 'root'
})

export class CepService {

  constructor(private http: HttpClient) { }

  public buscarEndereco(cep :string): Observable<Endereco> {
    return this.http.get<Endereco>(`https://viacep.com.br/ws/${cep}/json/`);
  }

}
