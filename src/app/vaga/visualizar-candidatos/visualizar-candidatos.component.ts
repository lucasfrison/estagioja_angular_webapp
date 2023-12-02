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
import { CandidaturaComEmpresa } from 'src/app/shared/models/candidatura-com-empresa.model';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalPerfilCandidatoComponent } from '../modal-perfil-candidato/modal-perfil-candidato.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EstudanteService } from 'src/app/services/estudante.service';
import { Estudante } from 'src/app/shared/models/estudante.model';


@Component({
  selector: 'app-visualizar-candidatos',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule
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
  login!: AuthResponse;
  estudanteModal!: Estudante

  constructor(
    private route: ActivatedRoute,
    private vagaService: VagaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private arquivoService: GerenciadorDeArquivosService,
    public dialog: MatDialog,
    private estudanteService: EstudanteService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.idVaga = +params['idVaga']; 
    });
    this.buscarCandidatos();
    this.buscarVaga();
  }

  modalCandidato(id: number) {
    this.estudanteService.buscarPorId(id).subscribe(
      response => {
        this.estudanteModal = response;
        const dialogRef = this.dialog.open(ModalPerfilCandidatoComponent, {
          width: '250px'
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
    );

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
    this.login = JSON.parse(localStorage.getItem('login')!);
    this.vagaService.aprovarCandidato(new CandidaturaComEmpresa(this.idVaga, id, this.login.id!)).subscribe(
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
