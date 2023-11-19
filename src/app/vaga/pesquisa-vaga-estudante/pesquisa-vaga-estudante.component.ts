import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaVagaComponent } from "../pesquisa-vaga/pesquisa-vaga.component";
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { VagaComCandidatos } from 'src/app/shared/models/vaga-com-candidatos.model';
import { VagaService } from 'src/app/services/vaga.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';
import { Candidatura } from 'src/app/shared/models/candidatura.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { GerenciadorDeArquivosService } from 'src/app/services/gerenciador-de-arquivos.service';

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
  minhasVagas: VagaComCandidatos[] = [];
  vagasRecomendadas: VagaComCandidatos[] = [];
  login?: AuthResponse;
  minhasVagasAtivo: boolean = true;
  recomendacoesAtivo: boolean = false;
  fotosAbertas: Blob[] = [];
  fotoAbertasURLs: string[] = [];
  fotosRecomendadas: Blob[] = [];
  fotosRecomendadasURLs: string[] = [];

  constructor(
    private vagaService: VagaService,
    private router: Router,
    private empresaService: EmpresaService,
    private arquivoService: GerenciadorDeArquivosService
  ) {} 

  ngOnInit(): void {
    this.login = JSON.parse(localStorage.getItem('login')!);
    this.buscarVagasPorIdEstudante();
  }

  buscarVagasPorIdEstudante() {
    this.vagaService.buscarPorIdEstudante(this.login?.id!).subscribe(
      response => {
        this.minhasVagas = response;
      },
      error => console.error(`Você não está cadastrado em nenhuma vaga!`) 
    );
    this.vagaService.buscarVagasRecomendadas(this.login?.id!).subscribe(
      response => {
        this.vagasRecomendadas = response
        this.vagasRecomendadas = this.vagasRecomendadas.filter(
          vaga => vaga.status === 'ABERTO'
        );
        this.obterFotosEmpresas();
      },
      error => console.error(`Nenhum histórico de vagas encontrado!`) 
    );
  }

  candidatar(idVaga: number) {
    this.vagaService.registrarCandidatura(new Candidatura(idVaga, this.login?.id!)).subscribe(
      response => {
        Swal.fire(
          "Candidatura",
          "A candidatura foi registrada com sucesso!",
          "success"
        );
        this.buscarVagasPorIdEstudante();
      },
      error => {
        Swal.fire(
          "Erro",
          "Erro ao registrar a candidatura!",
          "error"
        );
      }
    );
  }

  visualizarVaga(id: number) {
    this.router.navigate([`visualizar-vaga/${id}`]);
  }

  exibirCandidatos(id: number) {
    this.router.navigate([`visualizar-candidatos/${id}`]);
  }

  confirmarDesistirDaVaga(id: number) {
    Swal.fire({
      title: "Deseja desistir da vaga?",
      text: "Essa ação não pode ser revertida!",
      icon: "warning",
      showCancelButton: true, 
      confirmButtonColor: "#6638B5",
      cancelButtonColor: "#CC0000",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
          this.desistirDaVaga(id);
          Swal.fire(
            "Desistiu",
            "A candidatura foi retirada com sucesso!",
            "success"
          );
        }
      }
    );
  }

  desistirDaVaga(id: number) {
    this.vagaService.retirarCandidatura(new Candidatura(id, this.login?.id!)).subscribe(
      response => this.buscarVagasPorIdEstudante()
    );
  }

  ativarVisualizarMinhasVagas() {
    this.minhasVagasAtivo = true;
    this.recomendacoesAtivo = false;
  }

  ativarVisualizarRecomendacoes() {
    this.minhasVagasAtivo = false;
    this.recomendacoesAtivo = true;
  }

  pesquisarVaga() {
    let pesquisa = document.querySelector('#search') as HTMLInputElement;
    if (!pesquisa.value) {
      this.buscarVagasPorIdEstudante();
      return;
    }
    if (this.minhasVagasAtivo) {
      this.minhasVagas = this.minhasVagas.filter(vaga => vaga.titulo!.toLowerCase().indexOf(pesquisa.value.toLowerCase()) >= 0);
    } else {
      this.vagasRecomendadas = this.vagasRecomendadas.filter(vaga => vaga.titulo!.toLowerCase().indexOf(pesquisa.value.toLowerCase()) >= 0);
    }
  }

  limparPesquisa() {
    let pesquisa = document.querySelector('#search') as HTMLInputElement;
    pesquisa.value = '';
    this.pesquisarVaga();
  }

  carregarAprovacaoVaga(vaga: VagaComCandidatos): string {
    return vaga.status === 'CONCLUIDO' ? ' (Aprovado)' : '';
  }

  obterFotosEmpresas() {
    for (let vaga of this.minhasVagas) {
      this.empresaService.buscarPorId(vaga.idEmpresa!).subscribe(
        response => {
          //console.log(response);
          if (response.linkFoto) {
            this.arquivoService.obterArquivo(response.linkFoto).subscribe(
              (arquivo) => {
                //console.log(arquivo);
                let foto = new Blob([arquivo.body as BlobPart], { type: 'application/octet-stream' });
                let fotoURL = window.URL.createObjectURL(foto);
                this.fotosAbertas.push(foto);
                this.fotoAbertasURLs.push(fotoURL);
              }
            )
          } else {
            this.fotosAbertas.push(new Blob());
            this.fotoAbertasURLs.push(this.caminhoDaImagem);
          }
        }
      );
    }
    for (let vaga of this.vagasRecomendadas) {
      this.empresaService.buscarPorId(vaga.idEmpresa!).subscribe(
        response => {
          console.log(response);
          if (response.linkFoto) {
            this.arquivoService.obterArquivo(response.linkFoto).subscribe(
              (arquivo) => {
                console.log(arquivo);
                let foto = new Blob([arquivo.body as BlobPart], { type: 'application/octet-stream' });
                let fotoURL = window.URL.createObjectURL(foto);
                this.fotosRecomendadas.push(foto);
                this.fotosRecomendadasURLs.push(fotoURL);
              }
            )
          } else {
            this.fotosRecomendadas.push(new Blob());
            this.fotosRecomendadasURLs.push(this.caminhoDaImagem);
          }
        }
      );
    }
  }

}
