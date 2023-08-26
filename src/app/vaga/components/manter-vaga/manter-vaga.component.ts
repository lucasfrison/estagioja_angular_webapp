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
  @Input() alterarVaga: Vaga = new Vaga();

  turnos: Turno[] = [
    Turno.INTEGRAL,
    Turno.MATUTINO,
    Turno.NOTURNO,
    Turno.VESPERTINO
  ];

  modalidades: Modalidade[] = [
    Modalidade.PRESENCIAL,
    Modalidade.REMOTO,
    Modalidade.SEMIPRESENCIAL
  ];

  constructor(
    private vagaService: VagaService,
    private cursoService: CursoService,
    private competenciaService: CompetenciaService,
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
    if(this.alterarVaga){
      this.vaga = this.alterarVaga;
      
    } else {
      this.vaga = new Vaga();
    }

    if(this.meuFormulario.valid){
      console.log(this.meuFormulario.value);
    }

    this.competenciaService.buscarTodos().subscribe(competencias =>{
      this.competencias = competencias;
      console.log(competencias);
    });

    this.cursoService.buscarTodos().subscribe(cursos =>{
      this.cursos = cursos;
      console.log(this.cursos);
    });

    this.vaga.requisitos = [];
    this.vaga.cursos = [];

    console.log(this.alterarVaga);
    
    
  }

  inserirVaga() {
    this.vaga.status = 'ABERTO';
    const json = JSON.stringify(this.vaga, (key, value) => {
      if (key.startsWith('_')) {
        return undefined;
      }
      return value;
    });
    
    // Converte a string JSON de volta para um objeto JSON
    this.vaga = JSON.parse(json);
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

  
  adicionarRequisito(event: MatSelectChange) {
    this.vaga.requisitos = event.value;
    //console.log(this.vaga.competencias);
  }

  adicionarCurso(event: MatSelectChange) {
    this.vaga.cursos = event.value;
    //console.log(this.vaga.cursos);
  }

  getModalidadeString(index: number): string {
    return Modalidade[index];
  }

  getTurnoString(index: number): string {
    return Turno[index];
  }

}
