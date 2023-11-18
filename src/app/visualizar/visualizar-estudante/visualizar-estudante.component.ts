import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CepService } from 'src/app/services/cep.service';
import { CompetenciaService } from 'src/app/services/competencia.service';
import { CursoService } from 'src/app/services/curso.service';
import { EstudanteService } from 'src/app/services/estudante.service';
import { GerenciadorDeArquivosService } from 'src/app/services/gerenciador-de-arquivos.service';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';
import { Competencia } from 'src/app/shared/models/competencia.model';
import { Curso } from 'src/app/shared/models/curso.model';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { Estudante } from 'src/app/shared/models/estudante.model';
import { Modalidade } from 'src/app/shared/models/modalidade.model';
import { Turno } from 'src/app/shared/models/turno.model';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-visualizar-estudante',
  templateUrl: './visualizar-estudante.component.html',
  styleUrls: ['./visualizar-estudante.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    RouterModule
  ],
  standalone: true
})

export class VisualizarEstudanteComponent implements OnInit {

  formEstudante!: FormGroup;
  errorService: boolean = false;
  editando: boolean = false;
  endereco!: Endereco;
  estudante!: Estudante;
  login!: AuthResponse;
  idade!: number;
  competencias: Competencia[] = [];
  cursos: Curso[] = [];
  foto!: Blob;
  curriculo!: Blob;
  fotoURL: string = '../../../assets/vaga_image.png';

  modalidades: Modalidade[] = [
    Modalidade.PRESENCIAL,
    Modalidade.SEMIPRESENCIAL,
    Modalidade.REMOTO
  ];

  turnos: Turno[] = [
    Turno.MATUTINO,
    Turno.VESPERTINO,
    Turno.NOTURNO,
    Turno.INTEGRAL
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cepService: CepService,
    private estudanteService: EstudanteService,
    private competenciaService: CompetenciaService,
    private cursoService: CursoService,
    private location: Location,
    private arquivoService: GerenciadorDeArquivosService
  ) {}

  ngOnInit(): void {

    this.competenciaService.buscarTodos().subscribe(competencias =>{
      this.competencias = competencias;
    });

    this.cursoService.buscarTodos().subscribe(cursos =>{
      this.cursos = cursos;
    });

    this.endereco = new Endereco();
    this.buscarEstudante();
    this.inicializarFormEstudante();
  }

  inicializarFormEstudante() {
    this.formEstudante = new FormGroup({
        descricao: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        competencias: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        curso: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        modalidade: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        valorDaBolsa: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        turno: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        telefone: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        cep: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        cidade: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        estado: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        bairro: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        numero: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        endereco: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        complemento: new FormControl({ value: '', disabled: !this.editando }),
        uploadFoto: new FormControl({ value: '', disabled: true }),
        uploadCurriculo: new FormControl({ value: '', disabled: true })
    });
  }

  public buscarCep()
  {
    this.endereco.cep = this.formEstudante.get('cep')?.value;
    if(this.endereco.cep!.length === 8)
    {
        this.cepService.buscarEndereco(this.endereco.cep!).subscribe(
            res => {
              this.formEstudante.patchValue({
                  cidade: res.localidade,
                  estado: res.uf,
                  endereco: res.logradouro,
                  bairro: res.bairro,
                  numero: res.numero
              });                  
              console.log(this.endereco);
            },
            error => {
                this.errorService = error
            }
        )
    }
  }

  buscarEstudante() {
    this.login = JSON.parse(localStorage.getItem('login')!);
    this.estudanteService.buscarPorId(this.login?.id!).subscribe(
      response => {
        this.estudante = response
        this.endereco = this.estudante.endereco!
        this.idade = this.calcularIdade(this.estudante.dataDeNascimento!)
      }
    );
  }

  atualizarEstudante() {
    this.popularEstudante();
    this.estudanteService.atualizarEstudante(this.estudante).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: `Perfil alterado com sucesso!`,
          timer: 2500
        })
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'ERRO',
          text: 'Erro ao realizar a alteração!',
          timer: 2500
        })
      }
    );
  }

  popularEstudante() {
    let form = this.formEstudante;
    let e = this.estudante;

    e.id = this.login.id;
    e.cpf = this.estudante.cpf;
    e.sobre = form.get('descricao')?.value;
    e.modalidade = form.get('modalidade')?.value;
    e.valorDaBolsa = form.get('valorDaBolsa')?.value;
    e.turno = form.get('turno')?.value;
    e.telefone = form.get('telefone')?.value;
    e.email = this.estudante.email;
    e.linkCurriculo = this.estudante.linkCurriculo;
    e.linkFoto = this.estudante.linkFoto;
    
    e.endereco = new Endereco(
      form.get('cep')?.value,
      form.get('cidade')?.value,
      form.get('estado')?.value,
      form.get('bairro')?.value,
      form.get('numero')?.value,
      form.get('endereco')?.value,
      form.get('complemento')?.value
    );

    this.estudante = e;
    console.log(this.estudante);
  }

  calcularIdade(data: Date): number {
    var diff =(new Date().getTime() - new Date(data).getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff/365.25) - 1);
  }

  alterarStatusEdicao() {
    this.editando = true;
    this.inicializarFormEstudante();
    this.formEstudante.patchValue({
      //descricao: ,
      //competencias: ,
      //curso: ,
      //modalidade: this.getModalidadeString(Modalidade.PRESENCIAL),
      //valorDaBolsa: ,
      //turno: this.getTurnoString(Turno.INTEGRAL),
      telefone: this.estudante.telefone,
      cep: this.endereco.cep,
      cidade: this.endereco.localidade,
      estado: this.endereco.uf,
      bairro: this.endereco.bairro,
      numero: this.endereco.numero,
      endereco: this.endereco.logradouro,
      complemento: this.endereco.complemento
    });
  }

  getModalidadeString(index: number): string {
    return Modalidade[index];
  }

  getTurnoString(index: number): string {
    return Turno[index];
  }

  adicionarCompetencias(event: MatSelectChange) {
    this.estudante.competencias = event.value;
  }

  adicionarCurso(event: MatSelectChange) {
    this.estudante.curso = event.value;
  }

  voltar() {
    this.location.back();
  }

  fotoInputAction(fileInputEvent: any) {
    this.arquivoService.uploadFile(fileInputEvent.target.files[0], this.estudante.nome!, 'png').subscribe(
      response => {
        this.estudante.linkFoto = response.fileName
        console.log(this.estudante.linkFoto);
      }
    );
  }

  curriculoInputAction(fileInputEvent: any) {
    this.arquivoService.uploadFile(fileInputEvent.target.files[0], this.estudante.nome!, 'pdf').subscribe(
      response => {
        this.estudante.linkCurriculo = response.fileName
        console.log(this.estudante.linkCurriculo);
      }
    );
  }

  obterFoto() {
    if (!this.foto)
      this.arquivoService.obterArquivo(this.estudante.linkFoto!).subscribe(
        (response) => {
          this.foto = new Blob([response.body as BlobPart], { type: 'application/octet-stream' });
          this.fotoURL = window.URL.createObjectURL(this.foto);
        }
      );
    return this.fotoURL;
  }

  obterCurriculo() {
    this.arquivoService.obterArquivo(this.estudante.linkCurriculo!).subscribe(
      (response) => {
        this.curriculo = new Blob([response.body as BlobPart], { type: 'application/octet-stream' });
      }
    );
  }

}
