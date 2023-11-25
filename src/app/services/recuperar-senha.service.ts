import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../shared/models/email.model';

@Injectable({
  providedIn: 'root'
})
export class RecuperarSenhaService {

  private apiUrl = 'https://localhost:7238/Auth';

  constructor(private http: HttpClient) { }
  
  buscarEmail(email: string): Observable<Email> {
    return this.http.get<Email>(`${this.apiUrl}/recuperar-senha/${email}`);  
  }
}
