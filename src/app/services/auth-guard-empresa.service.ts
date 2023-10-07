import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardEmpresaService {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (1 < 2) {
      return true; // Permite o acesso à rota protegida
    } else {
      this.router.navigate(['/login']); // Redireciona para a página de login se o usuário não estiver autenticado
      return false; // Impede o acesso à rota protegida
    }
  }
}
