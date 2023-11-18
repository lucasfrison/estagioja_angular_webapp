import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VagaService } from 'src/app/services/vaga.service';
import { EstudanteCandidato } from 'src/app/shared/models/estudante-candidato.model';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Candidatura } from 'src/app/shared/models/candidatura.model';
import Swal from 'sweetalert2';
import { Vaga } from 'src/app/shared/models/vaga.model';

@Component({
  selector: 'app-visualizar-candidatos',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatListModule,
    MatSnackBarModule
  ],
  templateUrl: './visualizar-candidatos.component.html',
  styleUrls: ['./visualizar-candidatos.component.css']
})

export class VisualizarCandidatosComponent implements OnInit{

  idVaga!: number;
  candidatos: EstudanteCandidato[] = [];
  caminhoDaImagem: string = '../../assets/vaga_image.png';
  vaga!: Vaga;

  constructor(
    private route: ActivatedRoute,
    private vagaService: VagaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.idVaga = +params['idVaga']; 
    });
    this.buscarCandidatos();
    this.buscarVaga();
  }

  buscarCandidatos() {
    this.vagaService.buscarCandidatos(this.idVaga).subscribe(
      response => this.candidatos = response
    );
  }

  buscarVaga() {
    this.vagaService.buscarPorId(this.idVaga).subscribe(
      response => this.vaga = response
    );
  }

  aprovarCandidato(id: number) {
    this.vagaService.aprovarCandidato(new Candidatura(this.idVaga, id)).subscribe(
      (response) => {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: `Candidato Aprovado! Vaga Finalizada.`,
            timer: 2500
        })
      },
      (error) => {
        Swal.fire({
            icon: 'success',
            title: 'ERRO',
            text: `Ocorreu um erro durante a requisição!`,
            timer: 2500
        })
      }
    );
  }

  rejeitarCandidato(id: number) {
    this.vagaService.rejeitarCandidato(new Candidatura(this.idVaga, id)).subscribe(
      (response) => {
        this.buscarCandidatos();
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: `Candidatura rejeitada!`,
            timer: 2500
        })
      },
      (error) => {
        Swal.fire({
            icon: 'success',
            title: 'ERRO',
            text: `Erro ao rejeitar o candidato!`,
            timer: 2500
        })
      }
    );
  }

  voltar() {
    this.location.back();
  }

}
