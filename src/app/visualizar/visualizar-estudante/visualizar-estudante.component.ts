import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { CepService } from 'src/app/services/cep.service';
import { EstudanteService } from 'src/app/services/estudante.service';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { Estudante } from 'src/app/shared/models/estudante.model';

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
    MatListModule
  ],
  standalone: true
})

export class VisualizarEstudanteComponent implements OnInit {

  formEstudante!: FormGroup;
  errorService: boolean = false;
  endereco!: Endereco;
  estudante!: Estudante;
  login!: AuthResponse;
  idade!: number;

  ngOnInit(): void {
    this.inicializarFormEstudante();
    this.buscarEstudante();
    this.endereco = new Endereco();
  }

  constructor(
    private cepService: CepService,
    private estudanteService: EstudanteService
  ) {}

  inicializarFormEstudante() {
    this.formEstudante = new FormGroup({
        descricao: new FormControl({ value: '', disabled: true }, Validators.required),
        competencias: new FormControl({ value: '', disabled: true }, Validators.required),
        curso: new FormControl({ value: '', disabled: true }, Validators.required),
        modalidade: new FormControl({ value: '', disabled: true }, Validators.required),
        valorDaBolsa: new FormControl({ value: '', disabled: true }, Validators.required),
        turno: new FormControl({ value: '', disabled: true }, Validators.required),
        telefone: new FormControl({ value: '', disabled: true }, Validators.required),
        cep: new FormControl({ value: '', disabled: true }, Validators.required),
        cidade: new FormControl({ value: '', disabled: true }, Validators.required),
        estado: new FormControl({ value: '', disabled: true }, Validators.required),
        bairro: new FormControl({ value: '', disabled: true }, Validators.required),
        numero: new FormControl({ value: '', disabled: true }, Validators.required),
        endereco: new FormControl({ value: '', disabled: true }, Validators.required),
        complemento: new FormControl({ value: '', disabled: true })
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

  calcularIdade(data: Date): number {
    var diff =(new Date().getTime() - new Date(data).getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff/365.25) - 1);
  }

}
