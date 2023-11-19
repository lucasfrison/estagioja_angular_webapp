import { Component } from '@angular/core';
import { PesquisaVagaComponent } from 'src/app/vaga/pesquisa-vaga/pesquisa-vaga.component';
import { LinksPerfilComponent } from '../links-perfil/links-perfil.component';
import { LinksUteisComponent } from '../links-uteis/links-uteis.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { VagaService } from 'src/app/services/vaga.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';
import { VagaComCandidatos } from 'src/app/shared/models/vaga-com-candidatos.model';
import { GerenciadorDeArquivosService } from 'src/app/services/gerenciador-de-arquivos.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-inicial-empresa',
  templateUrl: './inicial-empresa.component.html',
  styleUrls: ['./inicial-empresa.component.css'],
  imports: [
    PesquisaVagaComponent,
    LinksPerfilComponent,
    LinksUteisComponent,
    MatIconModule,
    CommonModule
  ],
  standalone: true
})

export class InicialEmpresaComponent {

  caminhoDaImagem: string = '../../assets/vaga_image.png';
  vagasAbertas: VagaComCandidatos[] = [];
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
    this.vagasAbertas = this.vagasAbertas.sort((a, b) => a.id! < b.id! ? -1 : 1);
    this.vagasAbertas = this.vagasAbertas.slice(0, 5);
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
