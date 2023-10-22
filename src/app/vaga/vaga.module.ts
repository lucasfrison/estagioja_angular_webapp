import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManterVagaComponent } from './components/manter-vaga/manter-vaga.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule}  from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { AlterarVagaComponent } from './components/alterar-vaga/alterar-vaga.component';
import { PesquisaVagaComponent } from './pesquisa-vaga/pesquisa-vaga.component';
import { VisualizarCandidatosComponent } from './visualizar-candidatos/visualizar-candidatos.component';

@NgModule({
    declarations: [
    AlterarVagaComponent,
    ManterVagaComponent,
    PesquisaVagaComponent,
    VisualizarCandidatosComponent
  ],
    imports: [
      CommonModule,
      SharedModule,
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      MatDatepickerModule,
      NgModule,
      BrowserModule    
    ]
})
export class VagaModule { }
