import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
export class NotificacoesEmpresaComponent implements OnInit{

  ngOnInit() {
    
  }
}
