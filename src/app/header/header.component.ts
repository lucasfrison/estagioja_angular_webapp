import { Component, OnInit } from '@angular/core';
import { AuthResponse } from '../shared/models/auth-response.model';
import { Router } from '@angular/router';
import { PerfilAcesso } from '../shared/models/perfil-acesso.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    login?: AuthResponse;

    constructor(private router: Router) {}

    ngOnInit() {

    }

    abrirPaginaInicial() {
      this.login = JSON.parse(localStorage.getItem('login')!);
      if (this.login?.perfil == PerfilAcesso.ESTUDANTE)
        this.router.navigate(['/inicial-estudante']);
      else if (this.login?.perfil == PerfilAcesso.EMPRESA)
        this.router.navigate(['/inicial-empresa']);
    }

    abrirPesquisarVagas() {
      this.login = JSON.parse(localStorage.getItem('login')!);
      if (this.login?.perfil == PerfilAcesso.ESTUDANTE)
        this.router.navigate(['/pesquisar-vaga-estudante']);
      else if (this.login?.perfil == PerfilAcesso.EMPRESA)
        this.router.navigate(['/pesquisar-vaga-empresa']);
    }

    abrirNotificacoes() {
      this.login = JSON.parse(localStorage.getItem('login')!);
      if (this.login?.perfil == PerfilAcesso.ESTUDANTE)
        this.router.navigate(['/notificacoes-empresa']);
      else if (this.login?.perfil == PerfilAcesso.EMPRESA)
        this.router.navigate(['/notificacoes-empresa']);
    }

    abrirVisualizarPerfil() {
      this.login = JSON.parse(localStorage.getItem('login')!);
      if (this.login?.perfil == PerfilAcesso.ESTUDANTE)
        this.router.navigate(['/visualizar-estudante']);
      else if (this.login?.perfil == PerfilAcesso.EMPRESA)
        this.router.navigate(['/visualizar-empresa']);
    }

    logout() {
        localStorage.removeItem('login');
        window.location.reload();
    }

}
