import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CepService } from 'src/app/services/cep.service';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-visualiza-empresa',
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
    FormsModule,
    ReactiveFormsModule,
    MatListModule
  ],
  templateUrl: './visualiza-empresa.component.html',
  styleUrls: ['./visualiza-empresa.component.css']
})

export class VisualizaEmpresaComponent implements OnInit {

  formEmpresa!: FormGroup;
  errorService: boolean = false;
  endereco!: Endereco;
  empresa!: Empresa;
  editando: boolean = false;
  login!: AuthResponse;


  ngOnInit(): void {
    this.endereco = new Endereco();
    this.buscarEmpresa();
    this.inicializarFormEmpresa();
  }

  constructor(
    private cepService: CepService,
    private empresaService: EmpresaService,
    private router: Router,
    private location: Location
  ) {}

  buscarEmpresa() {
    this.login = JSON.parse(localStorage.getItem('login')!);
    this.empresaService.buscarPorIdLogin(this.login?.id!).subscribe(
      response => {
        this.empresa = response
        this.endereco = this.empresa.endereco!
        console.log("legal");
      }
    );
  }

  public buscarCep()
  {
    this.endereco.cep = this.formEmpresa.get('cep')?.value;
    if(this.endereco.cep!.length === 8)
    {
        this.cepService.buscarEndereco(this.endereco.cep!).subscribe(
            res => {
              this.formEmpresa.patchValue({
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

  inicializarFormEmpresa() {
    this.formEmpresa = new FormGroup({
        descricao: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        nome: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        telefone: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        cep: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        cidade: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        estado: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        bairro: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        numero: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        endereco: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
        complemento: new FormControl({ value: '', disabled: !this.editando })
    });
  } 

  
  alterarStatusEdicao() {
    this.editando = true;
    this.inicializarFormEmpresa();
    this.formEmpresa.patchValue({
      descricao: this.empresa.telefone,
      nome: this.empresa.nomeFantasia,
      telefone: this.empresa.telefone,
      cep: this.endereco.cep,
      cidade: this.endereco.localidade,
      estado: this.endereco.uf,
      bairro: this.endereco.bairro,
      numero: this.endereco.numero,
      endereco: this.endereco.logradouro,
      complemento: this.endereco.complemento
    });
  }

  voltar() {
    this.location.back();
  }

}
