import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';
import { PerfilAcesso } from 'src/app/shared/models/perfil-acesso.model';


@Component({
  selector: 'app-visualizar-vaga',
  standalone: true,
  imports: [    
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule],
  templateUrl: './visualizar-vaga.component.html',
  styleUrls: ['./visualizar-vaga.component.css']
})
export class VisualizarVagaComponent implements OnInit {

  chave: string = "login";
  loginDetectado!: PerfilAcesso;

  ngOnInit() {
    let usuarioLogado: AuthResponse | null = JSON.parse(localStorage.getItem(this.chave)!);
    if (usuarioLogado) {
      this.loginDetectado = usuarioLogado.perfil  !;
      console.log(this.loginDetectado);
    }
  }

}