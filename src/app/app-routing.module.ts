import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManterVagaComponent } from './vaga/components/manter-vaga/manter-vaga.component';
import { LoginComponent } from './auth/login/login.component';
import { AlterarVagaComponent } from './vaga/components/alterar-vaga/alterar-vaga.component';
import { CadastroComponent } from './auth/cadastro/cadastro.component';
import { LinksUteisComponent } from './home/links-uteis/links-uteis.component';
import { PesquisaVagaComponent } from './vaga/pesquisa-vaga/pesquisa-vaga.component';
import { LinksPerfilComponent } from './home/links-perfil/links-perfil.component';
import { InicialEstudanteComponent } from './home/inicial-estudante/inicial-estudante.component';
import { InicialEmpresaComponent } from './home/inicial-empresa/inicial-empresa.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastrar', component: CadastroComponent},
  { path: 'cadastrar-vaga', component: ManterVagaComponent},
  { path: 'alterar-vaga/:id', component: AlterarVagaComponent },
  { path: 'links-uteis', component: LinksUteisComponent},
  { path: 'pesquisar-vaga', component: PesquisaVagaComponent},
  { path: 'links-perfil', component: LinksPerfilComponent},
  { path: 'inicial-estudante', component: InicialEstudanteComponent},
  { path: 'inicial-empresa', component: InicialEmpresaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
