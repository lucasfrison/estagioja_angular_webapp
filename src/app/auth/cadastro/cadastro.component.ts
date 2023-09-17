import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CepService } from 'src/app/services/cep.service';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { Estudante } from 'src/app/shared/models/estudante.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  imports: [RouterModule, MatSlideToggleModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, FormsModule, ReactiveFormsModule, MatSnackBarModule],
  standalone: true
})
  
export class CadastroComponent implements OnInit{

    perfilEmpresa!: MatSlideToggle;
    formEmpresa!: FormGroup;
    formEstudante!: FormGroup;
    errorService: boolean = false;
    endereco!: Endereco;
    empresa!: Empresa;
    estudante!: Estudante;
    esconderSenha: boolean = true;

    constructor(
        private cepService: CepService, 
        private authService: AuthService, 
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.empresa = new Empresa();
        this.estudante = new Estudante();
        this.endereco = new Endereco();
        this.inicializarFormEstudante();
        this.inicializarFormEmpresa();
    }

    inicializarFormEstudante() {
        this.formEstudante = new FormGroup({
            cpf: new FormControl('', Validators.required),
            nome: new FormControl('', Validators.required),
            dataNascimento: new FormControl('', Validators.required),
            telefone: new FormControl('', Validators.required),
            cep: new FormControl('', Validators.required),
            cidade: new FormControl('', Validators.required),
            estado: new FormControl('', Validators.required),
            bairro: new FormControl('', Validators.required),
            numero: new FormControl('', Validators.required),
            endereco: new FormControl('', Validators.required),
            complemento: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            senha: new FormControl('', Validators.required)
        });
    }

    inicializarFormEmpresa() {
        this.formEmpresa = new FormGroup({
            cnpj: new FormControl('', Validators.required),
            razaoSocial: new FormControl('', Validators.required),
            nomeFantasia: new FormControl('', Validators.required),
            telefone: new FormControl('', Validators.required),
            cep: new FormControl('', Validators.required),
            cidade: new FormControl('', Validators.required),
            estado: new FormControl('', Validators.required),
            bairro: new FormControl('', Validators.required),
            numero: new FormControl('', Validators.required),
            endereco: new FormControl('', Validators.required),
            complemento: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            senha: new FormControl('', Validators.required)
        });
    }

    public buscarCep()
    {
        this.endereco.cep = this.formEstudante.get('cep')?.value ? 
                            this.formEstudante.get('cep')?.value :
                            this.formEmpresa.get('cep')?.value;
        if(this.endereco.cep!.length === 8)
        {
            this.cepService.buscarEndereco(this.endereco.cep!).subscribe(
                res => {
                    this.endereco = res;
                    if (!this.perfilEmpresa) {
                        this.formEstudante.patchValue({
                            cidade: res.localidade,
                            estado: res.uf,
                            endereco: res.logradouro,
                            bairro: res.bairro
                        });
                    } else {
                        this.formEmpresa.patchValue({
                            cidade: res.localidade,
                            estado: res.uf,
                            endereco: res.logradouro,
                            bairro: res.bairro
                        });
                    }
                    console.log(this.endereco);
                },
                error => {
                    this.errorService = error
                }
            )
        }
    }

    onFormEmpresaSubmit() {
        let form = this.formEmpresa;
        this.empresa = new Empresa(
            0,
            form.get('cnpj')?.value,
            form.get('razaoSocial')?.value,
            form.get('nomeFantasia')?.value,
            form.get('telefone')?.value,
            this.endereco,
            form.get('email')?.value,
            form.get('senha')?.value
        );

        console.log(this.empresa);

        const json = JSON.stringify(this.empresa);
    
        this.empresa = JSON.parse(json);
        console.log(this.empresa);
        this.authService.cadastrarEmpresa(this.empresa).subscribe(
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

    onFormEstudanteSubmit() {
        let form = this.formEstudante;
        this.estudante = new Estudante(
            0,
            form.get('cpf')?.value,
            form.get('nome')?.value,
            form.get('dataNascimento')?.value,
            form.get('telefone')?.value,
            this.endereco,
            form.get('email')?.value,
            form.get('senha')?.value
        );

        const json = JSON.stringify(this.estudante, (key, value) => {
            if (key.startsWith('_')) {
              return undefined;
            }
            return value;
          });
      
          this.estudante = JSON.parse(json);
          this.authService.cadastrarEstudante(this.estudante).subscribe(
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

}
