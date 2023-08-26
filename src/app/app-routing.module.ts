import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManterVagaComponent } from './vaga/components/manter-vaga/manter-vaga.component';
import { LoginComponent } from './auth/login/login.component';
import { AlterarVagaComponent } from './vaga/components/alterar-vaga/alterar-vaga.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastrar-vaga', component: ManterVagaComponent},
  { path: 'alterar-vaga/:id', component: AlterarVagaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
