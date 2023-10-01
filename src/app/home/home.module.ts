import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicialEstudanteComponent } from './inicial-estudante/inicial-estudante.component';
import { InicialEmpresaComponent } from './inicial-empresa/inicial-empresa.component';
import { LinksUteisComponent } from './links-uteis/links-uteis.component';



@NgModule({
  declarations: [
    InicialEstudanteComponent,
    InicialEmpresaComponent,
    LinksUteisComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
