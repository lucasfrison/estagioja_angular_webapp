import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';


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

  constructor(private builder: FormBuilder) { }

  ngOnInit() {

  }

}
