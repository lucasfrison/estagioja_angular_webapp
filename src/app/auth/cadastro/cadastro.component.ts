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
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  imports: [MatSlideToggleModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, FormsModule, ReactiveFormsModule, MatSnackBarModule],
  standalone: true
})
  
export class CadastroComponent implements OnInit{

    perfilEmpresa!: MatSlideToggle;
    formEmpresa!: FormGroup;
    formEstudante!: FormGroup;

    constructor() {
        this.inicializarFormEstudante();
        this.inicializarFormEmpresa();
    }

    ngOnInit() {
        return null;
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

}
