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
  vagas: VagaComCandidatos[] = [];
  login?: AuthResponse;
  visualizarVagasAbertas: boolean = true;

  constructor(
    private vagaService: VagaService,
    private router: Router
  ) {} 

  ngOnInit(): void {
    this.login = JSON.parse(localStorage.getItem('login')!);
    this.buscarVagasPorIdEmpresa();
  }

  buscarVagasPorIdEmpresa() {
    this.vagaService.buscarPorIdEmpresa(this.login?.id!).subscribe(
      response => this.vagas = response,
      error => console.error(`Nenhuma vaga encontrada para a empresa!`) 
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
    this.visualizarVagasAbertas = true;
  }
  
  ativarVisualizarHistorico() {
    this.visualizarVagasAbertas = false;
  }

}
