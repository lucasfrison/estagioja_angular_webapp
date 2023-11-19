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
import { GerenciadorDeArquivosService } from 'src/app/services/gerenciador-de-arquivos.service';

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
  fotosCandidatos: Blob[] = [];
  linksFotos: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private vagaService: VagaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private arquivoService: GerenciadorDeArquivosService
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
      response => {
        this.candidatos = response;
        this.obterFotosCandidatos();
      }
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
            icon: 'error',
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
            icon: 'error',
            title: 'ERRO',
            text: `Erro ao rejeitar o candidato!`,
            timer: 2500
        })
      }
    );
  }

  calcularIdade(data: Date): number {
    var diff =(new Date().getTime() - new Date(data).getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff/365.25) - 1);
  }

  obterFotosCandidatos() {
    for (let candidato of this.candidatos) {
      if (candidato.linkFoto) {
        this.arquivoService.obterArquivo(candidato.linkFoto).subscribe(
          (arquivo) => {
            //console.log(arquivo);
            let foto = new Blob([arquivo.body as BlobPart], { type: 'application/octet-stream' });
            let fotoURL = window.URL.createObjectURL(foto);
            this.fotosCandidatos.push(foto);
            this.linksFotos.push(fotoURL);
          }
        )
      } else {
        this.fotosCandidatos.push(new Blob());
        this.linksFotos.push(this.caminhoDaImagem);
      }
    }
  }

  baixarCurriculo(estudante: EstudanteCandidato) {
    if (!estudante.linkCurriculo) return;
    this.arquivoService.obterArquivo(estudante.linkCurriculo).subscribe(
      (response) => {
        const curriculo = new Blob([response.body as BlobPart], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(curriculo);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = estudante.linkCurriculo;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    );
  }

  voltar() {
    this.location.back();
  }

}
