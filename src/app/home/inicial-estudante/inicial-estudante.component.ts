import { Component } from '@angular/core';
import { PesquisaVagaComponent } from 'src/app/vaga/pesquisa-vaga/pesquisa-vaga.component';
import { LinksPerfilComponent } from '../links-perfil/links-perfil.component';
import { LinksUteisComponent } from '../links-uteis/links-uteis.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicial-estudante',
  templateUrl: './inicial-estudante.component.html',
  styleUrls: ['./inicial-estudante.component.css'],
  imports: [
    PesquisaVagaComponent,
    LinksPerfilComponent,
    LinksUteisComponent,
    MatIconModule,
    CommonModule
  ],
  standalone: true
})
export class InicialEstudanteComponent {

  caminhoDaImagem: string = '../../assets/vaga_image.png';

  vagas = [
    { id: 1, titulo: 'Estágio Programador .NET', imagemUrl: this.caminhoDaImagem },
    { id: 2, titulo: 'Programador AngularJS', imagemUrl: this.caminhoDaImagem },
    { id: 3, titulo: 'Desenvolvimento em React', imagemUrl: this.caminhoDaImagem },
    { id: 4, titulo: 'Vaga Programador Flutter', imagemUrl: this.caminhoDaImagem }
  ];

}
