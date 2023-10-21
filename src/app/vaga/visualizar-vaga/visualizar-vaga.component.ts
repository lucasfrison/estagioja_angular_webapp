import { CommonModule } from '@angular/common';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { VagaService } from 'src/app/services/vaga.service';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';
import { Candidatura } from 'src/app/shared/models/candidatura.model';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { Modalidade } from 'src/app/shared/models/modalidade.model';
import { PerfilAcesso } from 'src/app/shared/models/perfil-acesso.model';
import { Turno } from 'src/app/shared/models/turno.model';
import { VagaComCandidatos } from 'src/app/shared/models/vaga-com-candidatos.model';
import { Vaga } from 'src/app/shared/models/vaga.model';


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

  constructor(
    private route: ActivatedRoute,
    private vagaService: VagaService,
    private empresaService: EmpresaService,
    private snackBar: MatSnackBar,  
    private router: Router
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
        this.snackBar.open('Candidatura realizada com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: 'snackbar-success',
        });
      },
      (error) => {
        this.snackBar.open('Erro ao realizar a candidatura!', 'Fechar', {
          duration: 3000,
          panelClass: 'snackbar-error',
        });
      }
    );
  }

  alterarVaga() {
    this.router.navigate([`alterar-vaga/${this.idVaga}`]);
  }

  finalizarVaga() {
    let vaga = new Vaga(
      this.vaga.id,
      this.vaga.titulo,
      this.vaga.descricao,
      this.vaga.cursos,
      this.vaga.responsabilidades,
      this.vaga.beneficios,
      'FINALIZADO',
      this.vaga.valorDaBolsa,
      this.vaga.modalidade,
      this.vaga.requisitos,
      this.vaga.prazo,
      this.vaga.turno,
      this.vaga.idEmpresa
    );

    console.log(vaga);

    this.vagaService.alterar(vaga).subscribe(
      (response) => {
        this.snackBar.open('Vaga finalizada com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: 'snackbar-success',
        });
      },
      (error) => {
        this.snackBar.open('Erro ao finalizar a vaga!', 'Fechar', {
          duration: 3000,
          panelClass: 'snackbar-error',
        });
      }
    );
  }

  isEmpresa() {
    return this.loginDetectado === 1;
  }

  isEstudante() {
    return this.loginDetectado === 0;
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

}
