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
import { GerenciadorDeArquivosService } from 'src/app/services/gerenciador-de-arquivos.service';
import Swal from 'sweetalert2';

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
  foto!: Blob;
  fotoURL: string = '../../../assets/vaga_image.png';

  ngOnInit(): void {
    this.endereco = new Endereco();
    this.buscarEmpresa();
    this.inicializarFormEmpresa();
  }

  constructor(
    private cepService: CepService,
    private empresaService: EmpresaService,
    private router: Router,
    private location: Location,
    private arquivoService: GerenciadorDeArquivosService
  ) {}

  buscarEmpresa() {
    this.login = JSON.parse(localStorage.getItem('login')!);
    this.empresaService.buscarPerfilPorIdLogin(this.login?.id!).subscribe(
      response => {
        this.empresa = response
        this.endereco = this.empresa.endereco!
        console.log(this.empresa);
      }
    );
  }

  atualizarEmpresa() {
    this.popularEmpresa();
    this.empresaService.atualizarEmpresa(this.empresa).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: `Perfil alterado com sucesso!`,
          timer: 2500
        });
        this.buscarEmpresa();
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

  popularEmpresa() {
    let form = this.formEmpresa;
    let e = this.empresa;

    e.id = this.login.id;
    e.cnpj = this.empresa.cnpj;
    e.razaoSocial = this.empresa.razaoSocial;
    e.nomeFantasia = this.empresa.nomeFantasia;
    e.descricao = form.get('descricao')?.value;
    e.telefone = form.get('telefone')?.value;
    e.email = this.empresa.email;
    e.linkFoto = this.empresa.linkFoto;
    e.ramoDeAtuacao = form.get('ramoDeAtuacao')?.value;
    
    e.endereco = new Endereco(
      form.get('cep')?.value,
      form.get('cidade')?.value,
      form.get('estado')?.value,
      form.get('bairro')?.value,
      form.get('numero')?.value,
      form.get('endereco')?.value,
      form.get('complemento')?.value
    );

    this.empresa = e;
    console.log(this.empresa);
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
      ramoDeAtuacao: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
      telefone: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
      cep: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
      cidade: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
      estado: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
      bairro: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
      numero: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
      endereco: new FormControl({ value: '', disabled: !this.editando }, Validators.required),
      complemento: new FormControl({ value: '', disabled: !this.editando }),
      uploadFoto: new FormControl({ value: '', disabled: true })
    });
  } 

  
  alterarStatusEdicao() {
    this.editando = true;
    this.inicializarFormEmpresa();
    this.formEmpresa.patchValue({
      descricao: this.empresa.descricao,
      ramoDeAtuacao: this.empresa.ramoDeAtuacao,
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

  alterarStatusVisualizacao() {
    this.editando = false;
    this.inicializarFormEmpresa();
  }

  obterFoto() {
    if (!this.empresa.linkFoto!) return this.fotoURL;
    if (!this.foto)
      this.arquivoService.obterArquivo(this.empresa.linkFoto!).subscribe(
        (response) => {
          this.foto = new Blob([response.body as BlobPart], { type: 'application/octet-stream' });
          this.fotoURL = window.URL.createObjectURL(this.foto);
        }
      );
    return this.fotoURL;
  }

  fotoInputAction(fileInputEvent: any) {
    this.arquivoService.uploadFile(fileInputEvent.target.files[0], this.empresa.nomeFantasia!, 'png').subscribe(
      response => {
        this.empresa.linkFoto = response.fileName
        console.log(this.empresa.linkFoto);
      }
    );
  }

  voltar() {
    this.location.back();
  }

}
