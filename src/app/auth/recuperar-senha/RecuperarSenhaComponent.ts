import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { Email } from 'src/app/shared/models/email.model';
import { RecuperarSenhaService } from 'src/app/services/recuperar-senha.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class RecuperarSenhaComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: [''],
    from_name: 'james',
    to_name: 'Admin',
    from_email: 'diagjames@gmail.com',
    subject: 'dasdsad',
    message: 'boa tarde teste 123'
    
  });

  constructor(private builder: FormBuilder, private fb: FormBuilder, private senhaService: RecuperarSenhaService) { }

  ngOnInit() {}

  async send() {

    let email: Email;
    const emailValue = this.form.get('email')?.value;

    this.senhaService.buscarEmail(emailValue).subscribe(
      response => {
        email = response 
        if(email.email !== "E-mail não encontrado") {
          emailjs.init('0yVYnT_golLNxmqYp');// chave api

          emailjs.send('service_kyoiey7', 'template_i2i1m6f', {
            from_name: 'EstagioJa',
            to_name: email.nome,
            subject: 'Recuperação de senha',
            message: 'this is message', 
            to_email: emailValue
          }).then (
            () => {
              Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Email enviado com sucesso!',
                timer: 2500
              })
            }
          );
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Email enviado com sucesso!',
          timer: 2500
        })
      }
      }
    );


  }

}
