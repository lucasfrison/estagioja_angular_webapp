import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { VagaService } from 'src/app/services/vaga.service';
import { CursoService } from 'src/app/services/curso.service';
import { CompetenciaService } from 'src/app/services/competencia.service';
import { Curso } from 'src/app/shared/models/curso.model';
import { Competencia } from 'src/app/shared/models/competencia.model';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list'; 
import { CommonModule } from '@angular/common';
import { Vaga } from 'src/app/shared/models/vaga.model';
import { Turno } from 'src/app/shared/models/turno.model';
import { Modalidade } from 'src/app/shared/models/modalidade.model';
import { Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmpresaService } from 'src/app/services/empresa.service';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';



@Component({
  selector: 'app-manter-vaga',
  templateUrl: './manter-vaga.component.html',
  styleUrls: ['./manter-vaga.component.css'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, FormsModule, MatListModule, ReactiveFormsModule, MatSnackBarModule ],
  standalone: true

})
export class ManterVagaComponent implements OnInit {

  cursos: Curso[] = [];
  competencias: Competencia[] = [];
  vaga!: Vaga;
  novaCompetencia: any = {};
  meuFormulario: FormGroup;
  @Input() idVaga: number | undefined;

  turnos: Turno[] = [
    Turno.MATUTINO,
    Turno.VESPERTINO,
    Turno.NOTURNO,
    Turno.INTEGRAL
  ];

  modalidades: Modalidade[] = [
    Modalidade.PRESENCIAL,
    Modalidade.SEMIPRESENCIAL,
    Modalidade.REMOTO
  ];

  constructor(
    private vagaService: VagaService,
    private cursoService: CursoService,
    private competenciaService: CompetenciaService,
    private empresaService: EmpresaService,
    private snackBar: MatSnackBar
  ) {
    this.meuFormulario = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      cursos: new FormControl('', Validators.required),
      responsabilidades: new FormControl('', Validators.required),
      beneficios: new FormControl('', Validators.required),
      valorDaBolsa: new FormControl('', Validators.required),
      modalidade: new FormControl('', Validators.required),
      requisitos: new FormControl('', Validators.required),
      prazo: new FormControl('', Validators.required),
      curso: new FormControl('', Validators.required),
      turno: new FormControl('', Validators.required)
    });

  }

  ngOnInit() {
    if(this.idVaga){
      this.buscarVaga();
    } else {
      this.vaga = new Vaga();
      this.vaga.requisitos = [];
      this.vaga.cursos = [];
    }

    if(this.meuFormulario.valid){
      console.log(this.meuFormulario.value);
    }

    this.competenciaService.buscarTodos().subscribe(competencias =>{
      this.competencias = competencias;
    });

    this.cursoService.buscarTodos().subscribe(cursos =>{
      this.cursos = cursos;
    });

    //console.log(this.vaga);
  }

  onFormSubmit() {
    this.idVaga ? this.alterarVaga() : this.inserirVaga();
  }

  inserirVaga() {
    this.popularVaga();
    console.log(this.vaga);
    this.vagaService.inserir(this.vaga).subscribe(
      (response) => {
        this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: 'snackbar-success',
        });
      },
      (error) => {
        this.snackBar.open('Erro ao realizar o cadastro!', 'Fechar', {
          duration: 3000,
          panelClass: 'snackbar-error',
        });
      }
    );
  }

  popularVaga() {
    let form = this.meuFormulario;
    this.vaga = new Vaga(
        this.idVaga,
        form.get('titulo')?.value,
        form.get('descricao')?.value,
        form.get('cursos')?.value,
        form.get('responsabilidades')?.value,
        form.get('beneficios')?.value,
        'ABERTO',
        form.get('valorDaBolsa')?.value,
        form.get('modalidade')?.value,
        form.get('requisitos')?.value,
        form.get('prazo')?.value,
        form.get('turno')?.value
    );
    let login: AuthResponse = JSON.parse(localStorage.getItem('login')!);
    this.vaga.idEmpresa = login.id;
  }

  buscarVaga() {   
    this.vagaService.buscarPorId(this.idVaga!).subscribe((response) => {
      this.vaga = response as Vaga;
      this.meuFormulario.patchValue({
        titulo: this.vaga.titulo,
        descricao: this.vaga.descricao,
        responsabilidades: this.vaga.responsabilidades,
        beneficios: this.vaga.beneficios,
        valorDaBolsa: this.vaga.valorDaBolsa,
        modalidade: this.vaga.modalidade,
        prazo: this.vaga.prazo,
        turno: this.vaga.turno,
        cursos: this.vaga.cursos,
        requisitos: this.vaga.requisitos
      });
      console.log(this.vaga);
    },
    (error) => {
      console.log(error);
    });
  }

  alterarVaga() {
    this.popularVaga();
    this.vagaService.alterar(this.vaga).subscribe(
      (response) => {
        this.snackBar.open(`Vaga número ${this.vaga.id} alterada com sucesso!`, 'Fechar', {
          duration: 3000,
          panelClass: 'snackbar-success',
        });
      },
      (error) => {
        this.snackBar.open('Erro ao realizar a alteração!', 'Fechar', {
          duration: 3000,
          panelClass: 'snackbar-error',
        });
      }
    );
  }
  
  adicionarRequisito(event: MatSelectChange) {
    this.vaga.requisitos = event.value;
  }

  adicionarCurso(event: MatSelectChange) {
    this.vaga.cursos = event.value;
  }

  getModalidadeString(index: number): string {
    return Modalidade[index];
  }

  getTurnoString(index: number): string {
    return Turno[index];
  }

}
