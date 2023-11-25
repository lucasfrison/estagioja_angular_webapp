import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Notificacao } from 'src/app/shared/models/notificacao.model';
import { AuthService } from 'src/app/services/auth.service';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';

@Component({
  selector: 'app-notificacoes-empresa',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatListModule,
    MatSnackBarModule
  ],
  templateUrl: './notificacoes-empresa.component.html',
  styleUrls: ['./notificacoes-empresa.component.css']
})
export class NotificacoesComponent implements OnInit{

  notificacoes: Notificacao[] = [];
  login!: AuthResponse;

  constructor(private loginService: AuthService, private router: Router,) {}

  ngOnInit() {
    this.login = JSON.parse(localStorage.getItem('login')!);
    if (!this.login)
      this.router.navigate(["/"]);
    this.buscarNotificacoes();
  }

  buscarNotificacoes() {
    this.loginService.buscarNotificacoes(this.login.id!).subscribe(
      response => this.notificacoes = response
    );
  }

}
