import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstudanteService } from 'src/app/services/estudante.service';
import { VagaService } from 'src/app/services/vaga.service';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';
import { Candidatura } from 'src/app/shared/models/candidatura.model';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { Estudante } from 'src/app/shared/models/estudante.model';
import { Modalidade } from 'src/app/shared/models/modalidade.model';
import { PerfilAcesso } from 'src/app/shared/models/perfil-acesso.model';
import { Turno } from 'src/app/shared/models/turno.model';
import { VagaComCandidatos } from 'src/app/shared/models/vaga-com-candidatos.model';
import { Vaga } from 'src/app/shared/models/vaga.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualizar-vaga',
  standalone: true,
  imports: [    
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule],
  templateUrl: './visualizar-vaga.component.html',
  styleUrls: ['./visualizar-vaga.component.css']
})
export class VisualizarVagaComponent implements OnInit {

  chave: string = "login";
  loginDetectado!: PerfilAcesso;
  idVaga!: number;
  vaga!: VagaComCandidatos;
  usuarioLogado: AuthResponse | undefined;
  empresa!: Empresa;
  estudante!: Estudante;

  constructor(
    private route: ActivatedRoute,
    private vagaService: VagaService,
    private empresaService: EmpresaService,
    private estudanteService: EstudanteService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
        this.idVaga = +params['id']; 
    });
    this.usuarioLogado = JSON.parse(localStorage.getItem(this.chave)!);
    if (!this.usuarioLogado)
      this.router.navigate(["/"]); 
    this.loginDetectado = this.usuarioLogado!.perfil!;
    this.buscarVaga();
    this.estudanteService.buscarPorId(this.usuarioLogado?.id!).subscribe(
      response => this.estudante = response
    );
  }

  buscarVaga() {
    this.vagaService.buscarVagaComCandidatos(this.idVaga).subscribe(
      response => {
        this.vaga = response;
        this.buscarEmpresa();
        console.log(this.vaga);
      },
      error => console.log(`Vaga com o id ${this.idVaga} não encontrada!`)
    );
  }

  buscarEmpresa() {
    this.empresaService.buscarPorId(this.vaga.idEmpresa!).subscribe(
      response => {
        this.empresa = response;
        console.log(this.empresa);
      },
      error => console.log(`Empresa com o id ${this.vaga.idEmpresa} não encontrada!`)
    );
  }

  registrarCandidatura() {
    this.vagaService.registrarCandidatura(new Candidatura(this.idVaga, this.usuarioLogado?.id!)).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Candidatura realizada com sucesso!',
          timer: 2500
        })
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'ERRO',
          text: 'Erro ao realizar a candidatura!',
          timer: 2500
        }) 
      }
    );
  }

  confirmarDesistirDaVaga(id: number) {
    Swal.fire({
      title: "Retirar candidatura",
      text: "Tem certeza que deseja desistir da vaga?",
      icon: "warning",
      showCancelButton: true, 
      confirmButtonColor: "#6638B5",
      cancelButtonColor: "#CC0000",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
          this.retirarCandidatura(id);
          Swal.fire(
            "Sucesso",
            "Candidatura retirada com sucesso!",
            "success"
          );
        }
      }
    );
  }

  retirarCandidatura(id: number) {
    this.vagaService.retirarCandidatura(new Candidatura(id, this.usuarioLogado!.id!)).subscribe(
      response => console.log(response)
    );
  }

  alterarVaga() {
    this.router.navigate([`alterar-vaga/${this.idVaga}`]);
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
      response => console.log(response)
    );
  }

  isEmpresa() {
    return this.loginDetectado === 1;
  }

  isEstudante() {
    return this.loginDetectado === 0;
  }

  isEstudanteInscritoNaVaga() {
    return this.isEstudante() && this.vaga.idEstudantes?.find(id => id === this.estudante.id);
  }

  getModalidadeString(index: number): string {
    return Modalidade[index];
  }

  getTurnoString(index: number): string {
    return Turno[index];
  }

  visualizarCandidatos() {
    this.router.navigate([`visualizar-candidatos/${this.idVaga}`]);
  }

  voltar() {
    this.location.back();
  }

}
