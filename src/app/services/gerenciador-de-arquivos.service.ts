import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GerenciadorDeArquivosService {
  private apiUrl = 'https://localhost:7238/arquivo';

  constructor(private http: HttpClient) {}

  uploadFile(file: File, nomeUsuario: string, extensao: string): Observable<any> {
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    let hash = Md5.hashStr(nomeUsuario + dataAtual + file.name);
    hash = `${hash}.${extensao}`;
    const formData: FormData = new FormData();
    formData.append('arquivo', file, hash);
    return this.http.post<any>(`${this.apiUrl}`, formData);
  }

  obterArquivo(nomeArquivo: string): Observable<HttpResponse<Blob>> {
    const url = `${this.apiUrl}/${nomeArquivo}`;
    return this.http.get<Blob>(url, {
      observe: 'response',
      responseType: 'blob' as 'json', // responseType 'blob' é usado para indicar que a resposta é um arquivo binário
    });
  }

}
