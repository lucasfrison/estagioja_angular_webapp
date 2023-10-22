import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManterVagaComponent } from './vaga/manter-vaga/manter-vaga.component';
import { LoginComponent } from './auth/login/login.component';
import { AlterarVagaComponent } from './vaga/alterar-vaga/alterar-vaga.component';
import { CadastroComponent } from './auth/cadastro/cadastro.component';
import { LinksUteisComponent } from './home/links-uteis/links-uteis.component';
import { PesquisaVagaComponent } from './vaga/pesquisa-vaga/pesquisa-vaga.component';
import { LinksPerfilComponent } from './home/links-perfil/links-perfil.component';
import { InicialEstudanteComponent } from './home/inicial-estudante/inicial-estudante.component';
import { InicialEmpresaComponent } from './home/inicial-empresa/inicial-empresa.component';
import { AuthGuardEmpresaService } from './services/auth-guard-empresa.service';
import { AuthGuardEstudanteService } from './services/auth-guard-estudante.service';
import { VisualizarEstudanteComponent } from './visualizar/visualizar-estudante/visualizar-estudante.component';
import { VisualizaEmpresaComponent } from './visualizar/visualiza-empresa/visualiza-empresa.component';
import { VisualizarVagaComponent } from './vaga/visualizar-vaga/visualizar-vaga.component';
import { VisualizarCandidatosComponent } from './vaga/visualizar-candidatos/visualizar-candidatos.component';
import { PesquisaVagaEstudanteComponent } from './vaga/pesquisa-vaga-estudante/pesquisa-vaga-estudante.component';
import { PesquisaVagaEmpresaComponent } from './vaga/pesquisa-vaga-empresa/pesquisa-vaga-empresa.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastrar', component: CadastroComponent},
  { path: 'cadastrar-vaga', component: ManterVagaComponent, canActivate: [AuthGuardEmpresaService]},
  { path: 'alterar-vaga/:id', component: AlterarVagaComponent, canActivate: [AuthGuardEmpresaService] },
  { path: 'links-uteis', component: LinksUteisComponent},
  { path: 'pesquisar-vaga', component: PesquisaVagaComponent},
  { path: 'links-perfil', component: LinksPerfilComponent},
  { path: 'inicial-estudante', component: InicialEstudanteComponent, canActivate: [AuthGuardEstudanteService]},
  { path: 'inicial-empresa', component: InicialEmpresaComponent, canActivate: [AuthGuardEmpresaService]},
  { path: 'visualizar-estudante', component: VisualizarEstudanteComponent},
  { path: 'visualizar-empresa', component: VisualizaEmpresaComponent},
  { path: 'visualizar-vaga/:id', component: VisualizarVagaComponent},
  { path: 'visualizar-candidatos/:idVaga', component: VisualizarCandidatosComponent, canActivate: [AuthGuardEmpresaService]},
  { path: 'pesquisar-vaga-estudante', component: PesquisaVagaEstudanteComponent},
  { path: 'pesquisar-vaga-empresa', component: PesquisaVagaEmpresaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
