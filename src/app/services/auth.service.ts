import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../shared/models/usuario.model';
import { Estudante } from '../shared/models/estudante.model';
import { Empresa } from '../shared/models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'https://localhost:7238/Auth';

    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    

    constructor(private http: HttpClient) { }

    public cadastrarEstudante(estudante: Estudante) {
        return this.http.post<Estudante>(`${this.apiUrl}/cadastrar-estudante`, estudante, {headers: this.headers});
    }

    public cadastrarEmpresa(empresa: Empresa) {
        return this.http.post<Empresa>(`${this.apiUrl}/cadastrar-empresa`, empresa, {headers: this.headers});
    }

}
