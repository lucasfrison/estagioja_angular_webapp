import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import emailjs from '@emailjs/browser';

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

  constructor(private builder: FormBuilder, private fb: FormBuilder, private senhaService: RecuperarSenhaComponent) { }

  ngOnInit() {}

  async send() {

    const emailValue = this.form.get('email')?.value;

    this.senhaService.buscarEmail(emailValue).subscribe(
      response => 
    );

    emailjs.init('0yVYnT_golLNxmqYp');// chave api

    let response = await emailjs.send('service_kyoiey7', 'template_i2i1m6f', {
      from_name: 'EstagioJa',
      to_name: 'James',
      from_email: 'james.govida@hotmail.com',
      subject: 'Test subject',
      message: 'this is message', 
      to_email: emailValue
    });

    alert("mensagem enviada!");
    this.form.reset();
  }

}
