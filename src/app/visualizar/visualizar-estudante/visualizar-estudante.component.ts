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
import { Empresa } from 'src/app/shared/models/empresa.model';
import { Endereco } from 'src/app/shared/models/endereco.model';

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
  empresa!: Empresa;

  ngOnInit(): void {
    this.inicializarFormEstudante();
    this.endereco = new Endereco();
  }

  constructor(
    private cepService: CepService
  ) {}

  inicializarFormEstudante() {
    this.formEstudante = new FormGroup({
        descricao: new FormControl('', Validators.required),
        competencias: new FormControl('', Validators.required),
        curso: new FormControl('', Validators.required),
        modalidade: new FormControl('', Validators.required),
        valorDaBolsa: new FormControl('', Validators.required),
        turno: new FormControl('', Validators.required),
        telefone: new FormControl('', Validators.required),
        cep: new FormControl('', Validators.required),
        cidade: new FormControl('', Validators.required),
        estado: new FormControl('', Validators.required),
        bairro: new FormControl('', Validators.required),
        numero: new FormControl('', Validators.required),
        endereco: new FormControl('', Validators.required),
        complemento: new FormControl('')
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

}
