import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthRequest } from 'src/app/shared/models/authRequest.model';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthResponse } from 'src/app/shared/models/auth-response.model';
import { PerfilAcesso } from 'src/app/shared/models/perfil-acesso.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterModule, ReactiveFormsModule, MatSnackBarModule],
  standalone: true
})

export class LoginComponent implements OnInit{

  formLogin!: FormGroup;
  login!: AuthRequest;
  chave: string = "login";

  constructor( 
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.login = new AuthRequest();
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
        this.snackBar.open('Credenciais incorretas, por favor tente novamente!', 'Fechar', {
          duration: 3000,
          panelClass: 'snackbar-error',
        });
      }
    );
  }

}
