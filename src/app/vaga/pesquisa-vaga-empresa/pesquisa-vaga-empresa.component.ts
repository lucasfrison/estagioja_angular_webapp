import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pesquisa-vaga-empresa',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './pesquisa-vaga-empresa.component.html',
  styleUrls: ['./pesquisa-vaga-empresa.component.css']
})
export class PesquisaVagaEmpresaComponent {

  caminhoDaImagem: string = '../../assets/vaga_image.png';

  vagas = [
    { id: 1, titulo: 'Estágio Programador .NET', imagemUrl: this.caminhoDaImagem },
    { id: 2, titulo: 'Programador AngularJS', imagemUrl: this.caminhoDaImagem },
    { id: 3, titulo: 'Desenvolvimento em React', imagemUrl: this.caminhoDaImagem },
    { id: 4, titulo: 'Vaga Programador Flutter', imagemUrl: this.caminhoDaImagem }
  ];

}
