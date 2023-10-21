import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-visualizar-candidatos',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule],
  templateUrl: './visualizar-candidatos.component.html',
  styleUrls: ['./visualizar-candidatos.component.css']
})
export class VisualizarCandidatosComponent implements OnInit{

  caminhoDaImagem: string = '../../assets/vaga_image.png';

  ngOnInit(): void {
    
  }

  vagas = [
    { id: 1, titulo: 'Estágio Programador .NET', imagemUrl: this.caminhoDaImagem },
    { id: 2, titulo: 'Programador AngularJS', imagemUrl: this.caminhoDaImagem },
    { id: 3, titulo: 'Desenvolvimento em React', imagemUrl: this.caminhoDaImagem },
    { id: 4, titulo: 'Vaga Programador Flutter', imagemUrl: this.caminhoDaImagem },
    { id: 5, titulo: 'Estágio Redes de Computadores', imagemUrl: this.caminhoDaImagem }
  ];

}
