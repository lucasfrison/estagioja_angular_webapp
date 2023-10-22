import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaVagaComponent } from "../pesquisa-vaga/pesquisa-vaga.component";
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-pesquisa-vaga-estudante',
    standalone: true,
    templateUrl: './pesquisa-vaga-estudante.component.html',
    styleUrls: ['./pesquisa-vaga-estudante.component.css'],
    imports: [
      CommonModule, 
      PesquisaVagaComponent,
      MatIconModule]
})
export class PesquisaVagaEstudanteComponent {

  caminhoDaImagem: string = '../../assets/vaga_image.png';

  vagas = [
    { id: 1, titulo: 'Estágio Programador .NET', imagemUrl: this.caminhoDaImagem },
    { id: 2, titulo: 'Programador AngularJS', imagemUrl: this.caminhoDaImagem },
    { id: 3, titulo: 'Desenvolvimento em React', imagemUrl: this.caminhoDaImagem },
    { id: 4, titulo: 'Vaga Programador Flutter', imagemUrl: this.caminhoDaImagem }
  ];

}
