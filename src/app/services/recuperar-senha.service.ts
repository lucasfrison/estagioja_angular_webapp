import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../shared/models/email.model';
import { AuthRequest } from '../shared/models/authRequest.model';
import { AuthResponse } from '../shared/models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class RecuperarSenhaService{

  private apiUrl = 'https://localhost:7238/Auth';

  constructor(private http: HttpClient) { }
  
  buscarEmail(email: string): Observable<Email> {
    return this.http.get<Email>(`${this.apiUrl}/recuperar-senha/${email}`);  
  }

  modificarSenha(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/alterarSenha`, authRequest);
  }
}
