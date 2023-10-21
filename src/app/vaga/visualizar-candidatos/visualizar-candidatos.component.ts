import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VagaService } from 'src/app/services/vaga.service';
import { EstudanteCandidato } from 'src/app/shared/models/estudante-candidato.model';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidatura } from 'src/app/shared/models/candidatura.model';

@Component({
  selector: 'app-visualizar-candidatos',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatListModule
  ],
  templateUrl: './visualizar-candidatos.component.html',
  styleUrls: ['./visualizar-candidatos.component.css']
})
export class VisualizarCandidatosComponent implements OnInit{

  idVaga!: number;
  candidatos: EstudanteCandidato[] = [];
  caminhoDaImagem: string = '../../assets/vaga_image.png';

  constructor(
    private route: ActivatedRoute,
    private vagaService: VagaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.idVaga = +params['idVaga']; 
    });
    this.buscarCandidatos();
  }

  buscarCandidatos() {
    this.vagaService.buscarCandidatos(this.idVaga).subscribe(
      response => this.candidatos = response
    );
  }

  aprovarCandidato(id: number) {
    this.vagaService.aprovarCandidato(new Candidatura(this.idVaga, id)).subscribe(
      (response) => {
        this.snackBar.open('Candidato arpovado! Vaga finalizada!', 'Fechar', {
          duration: 3000,
          panelClass: 'snackbar-success',
        });
      },
      (error) => {
        this.snackBar.open('Erro ao aprovar o candidato!', 'Fechar', {
          duration: 3000,
          panelClass: 'snackbar-error',
        });
      }
    );
  }

  rejeitarCandidato(id: number) {
    this.vagaService.rejeitarCandidato(new Candidatura(this.idVaga, id)).subscribe(
      (response) => {
        this.buscarCandidatos();
        this.snackBar.open('Candidatura rejeitada com sucesso.', 'Fechar', {
          duration: 3000,
          panelClass: 'snackbar-success',
        });
      },
      (error) => {
        this.snackBar.open('Erro ao rejeitar a candidatura!', 'Fechar', {
          duration: 3000,
          panelClass: 'snackbar-error',
        });
      }
    );
  }

}
