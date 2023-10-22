import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthRequest } from 'src/app/shared/models/authRequest.model';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';
import { PerfilAcesso } from 'src/app/shared/models/perfil-acesso.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterModule, 
    ReactiveFormsModule],
  standalone: true
})

export class LoginComponent implements OnInit{

  formLogin!: FormGroup;
  login!: AuthRequest;
  chave: string = "login";

  constructor( 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    let usuarioLogado: AuthResponse | null = JSON.parse(localStorage.getItem(this.chave)!);
    if (usuarioLogado) {
        if (usuarioLogado.perfil === PerfilAcesso.ESTUDANTE) {
            this.router.navigate(['/inicial-estudante']);
        } else {
            this.router.navigate(['/inicial-empresa']);
        }
    }
    this.inicializarFormLogin();
  }

  inicializarFormLogin() {
    this.formLogin = new FormGroup({
        email: new FormControl('', Validators.required),
        senha: new FormControl('', Validators.required)
    });
  }

  logar() {
    let form = this.formLogin;
    this.login = new AuthRequest(
      form.get('email')?.value,
      form.get('senha')?.value
    );

    this.authService.logar(this.login).subscribe(
      (response) => {
        let login: AuthResponse = response;
        localStorage.setItem(this.chave, JSON.stringify(login));
        if (login.perfil === PerfilAcesso.ESTUDANTE) {
            this.router.navigate(['/inicial-estudante']);
        } else {
            this.router.navigate(['/inicial-empresa']);
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'ERRO',
          text: 'Credenciais incorretas, por favor tente novamente!',
          timer: 2500
        })
      }
    );
  }

}
