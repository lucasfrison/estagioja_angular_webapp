import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManterVagaComponent } from './components/manter-vaga/manter-vaga.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule}  from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserModule } from '@angular/platform-browser';





@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      SharedModule,
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      MatDatepickerModule,
      NgModule,
      BrowserModule,
    ]
})
export class VagaModule { }
