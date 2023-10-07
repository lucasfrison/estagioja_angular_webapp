import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from '../shared/models/auth-response.model';
import { PerfilAcesso } from '../shared/models/perfil-acesso.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardEmpresaService {

  chave: string = 'login';
  login?: AuthResponse;

  constructor(private router: Router) {}

  canActivate(): boolean {
    this.login = JSON.parse(localStorage.getItem(this.chave)!);
    if (!(this.login?.perfil === PerfilAcesso.EMPRESA)) {
        this.router.navigate(['/inicial-estudante']);
        return false;
    }
    return true;
  }
}
