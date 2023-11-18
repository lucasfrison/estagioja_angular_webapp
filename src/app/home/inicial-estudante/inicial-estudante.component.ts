import { Component } from '@angular/core';
import { PesquisaVagaComponent } from 'src/app/vaga/pesquisa-vaga/pesquisa-vaga.component';
import { LinksPerfilComponent } from '../links-perfil/links-perfil.component';
import { LinksUteisComponent } from '../links-uteis/links-uteis.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';
import { VagaService } from 'src/app/services/vaga.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidatura } from 'src/app/shared/models/candidatura.model';
import { VagaComCandidatos } from 'src/app/shared/models/vaga-com-candidatos.model';

@Component({
  selector: 'app-inicial-estudante',
  templateUrl: './inicial-estudante.component.html',
  styleUrls: ['./inicial-estudante.component.css'],
  imports: [
    PesquisaVagaComponent,
    LinksPerfilComponent,
    LinksUteisComponent,
    MatIconModule,
    CommonModule
  ],
  standalone: true
})

export class InicialEstudanteComponent {

  login?: AuthResponse;
  minhasVagas: VagaComCandidatos[] = [];
  caminhoDaImagem: string = '../../assets/vaga_image.png';

  constructor(
    private vagaService: VagaService,
    private router: Router
  ) {} 

  ngOnInit(): void {
    this.login = JSON.parse(localStorage.getItem('login')!);
    this.buscarVagasPorIdEstudante();
  }
  
  buscarVagasPorIdEstudante() {
    this.vagaService.buscarPorIdEstudante(this.login?.id!).subscribe(
      response => this.minhasVagas = response,
      error => console.error(`Você não está cadastrado em nenhuma vaga!`) 
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

}
