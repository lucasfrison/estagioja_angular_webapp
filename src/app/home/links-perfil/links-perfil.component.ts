import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FraseService } from 'src/app/services/frase.service';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';
import { Frase } from 'src/app/shared/models/frase.model';
import { PerfilAcesso } from 'src/app/shared/models/perfil-acesso.model';

@Component({
  selector: 'app-links-perfil',
  templateUrl: './links-perfil.component.html',
  styleUrls: ['./links-perfil.component.css'],
  imports: [ 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule ],
  standalone: true,
})

export class LinksPerfilComponent implements OnInit {

  frase!: Frase;
  chave: string = "login";
  usuarioLogado!: AuthResponse;

  constructor(private fraseService: FraseService) {
  }

  ngOnInit(){
    this.usuarioLogado = JSON.parse(localStorage.getItem(this.chave)!);
    if (this.usuarioLogado) {
      this.buscaFrases();
    }
    
  }

  buscaFrases() {
    const numeroAleatorio: number = Math.floor(Math.random() * 24) + 1;
    if(this.usuarioLogado.perfil === PerfilAcesso.ESTUDANTE) {
      this.fraseService.buscarPorIdEstudante(numeroAleatorio).subscribe(response =>{
        this.frase = response;
      });
      return;
    }
    this.fraseService.buscarPorIdEmpresa(numeroAleatorio).subscribe(response =>{
      this.frase = response;
    });
  }

}
