import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { VagaService } from 'src/app/services/vaga.service';
import { Vaga } from 'src/app/shared/models/vaga.model';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';
import { VagaComCandidatos } from 'src/app/shared/models/vaga-com-candidatos.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmpresaService } from 'src/app/services/empresa.service';
import { GerenciadorDeArquivosService } from 'src/app/services/gerenciador-de-arquivos.service';

@Component({
  selector: 'app-pesquisa-vaga-empresa',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './pesquisa-vaga-empresa.component.html',
  styleUrls: ['./pesquisa-vaga-empresa.component.css']
})
export class PesquisaVagaEmpresaComponent implements OnInit {
  
  caminhoDaImagem: string = '../../assets/vaga_image.png';
  vagasAbertas: VagaComCandidatos[] = [];
  vagasFinalizadas: VagaComCandidatos[] = [];
  login?: AuthResponse;
  visualizarVagasAbertas: boolean = true;
  VagasAbertasAtivo: boolean = true;
  HistoricoAtivo: boolean = false;
  foto!: Blob;
  fotoURL: string = '../../../assets/vaga_image.png';

  constructor(
    private vagaService: VagaService,
    private router: Router,
    private empresaService: EmpresaService,
    private arquivoService: GerenciadorDeArquivosService  
  ) {} 

  ngOnInit(): void {
    this.login = JSON.parse(localStorage.getItem('login')!);
    this.buscarVagasPorIdEmpresa();
    this.obterFoto();
  }

  buscarVagasPorIdEmpresa() {
    this.vagaService.buscarPorIdEmpresa(this.login?.id!).subscribe(
      response => this.vagasAbertas = response,
      error => console.error(`Nenhuma vaga encontrada para a empresa!`) 
    );
    this.vagaService.buscarHistoricoPorIdEmpresa(this.login?.id!).subscribe(
      response => this.vagasFinalizadas = response,
      error => console.error(`Nenhum histórico de vagas encontrado!`) 
    );
  }

  cadastrarVaga() {
    this.router.navigate(['cadastrar-vaga']);
  }

  visualizarVaga(id: number) {
    this.router.navigate([`visualizar-vaga/${id}`]);
  }

  exibirCandidatos(id: number) {
    this.router.navigate([`visualizar-candidatos/${id}`]);
  }

  confirmarFinalizarVaga(id: number) {
    Swal.fire({
      title: "Deseja finalizar a vaga?",
      text: "Essa ação não pode ser revertida!",
      icon: "warning",
      showCancelButton: true, 
      confirmButtonColor: "#6638B5",
      cancelButtonColor: "#CC0000",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
          this.finalizarVaga(id);
          Swal.fire(
            "Finalizada",
            "Vaga finalizada com sucesso!",
            "success"
          );
        }
      }
    );
  }

  finalizarVaga(id: number) {
    this.vagaService.finalizarVaga(id).subscribe(
      response => this.buscarVagasPorIdEmpresa()
    );
  }

  ativarVisualizarVagasAbertas() {
    this.VagasAbertasAtivo = true;
    this.HistoricoAtivo = false;
  }

  ativarVisualizarHistorico() {
    this.VagasAbertasAtivo = false;
    this.HistoricoAtivo = true;
  }

  pesquisarVaga() {
    let pesquisa = document.querySelector('#search') as HTMLInputElement;
    if (!pesquisa.value) {
      this.buscarVagasPorIdEmpresa();
      return;
    }
    if (this.VagasAbertasAtivo) {
      this.vagasAbertas = this.vagasAbertas.filter(vaga => vaga.titulo!.toLowerCase().indexOf(pesquisa.value.toLowerCase()) >= 0);
    } else {
      this.vagasFinalizadas = this.vagasFinalizadas.filter(vaga => vaga.titulo!.toLowerCase().indexOf(pesquisa.value.toLowerCase()) >= 0);
    }
  }

  limparPesquisa() {
    let pesquisa = document.querySelector('#search') as HTMLInputElement;
    pesquisa.value = '';
    this.pesquisarVaga();
  }

  carregarAprovacaoVaga(vaga: VagaComCandidatos): string {
    return vaga.status === 'CONCLUIDO' ? ' (Concluída)' : '';
  }

  obterFoto() {
    this.empresaService.buscarPorIdLogin(this.login?.id!).subscribe(
      (empresa) => {
        if (!empresa.linkFoto) return;
          if (!this.foto)
            this.arquivoService.obterArquivo(empresa.linkFoto!).subscribe(
              (response) => {
                this.foto = new Blob([response.body as BlobPart], { type: 'application/octet-stream' });
                this.fotoURL = window.URL.createObjectURL(this.foto);
              }
            )
      }
    );
  }

}
