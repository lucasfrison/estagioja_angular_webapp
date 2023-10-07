import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicialEstudanteComponent } from './inicial-estudante/inicial-estudante.component';
import { InicialEmpresaComponent } from './inicial-empresa/inicial-empresa.component';
import { LinksUteisComponent } from './links-uteis/links-uteis.component';
import { LinksPerfilComponent } from './links-perfil/links-perfil.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    InicialEstudanteComponent,
    InicialEmpresaComponent,
    LinksUteisComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class HomeModule { }
