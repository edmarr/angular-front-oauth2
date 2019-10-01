import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LogisticaComponent } from './logistica/logistica.component';
import { LogisticaEntregaComponent } from './logistica-entrega/logistica-entrega.component';
import { ControleOcorrenciaComponent } from './controle-ocorrencia/controle-ocorrencia.component';
import { ControleFreteComponent } from './controle-frete/controle-frete.component';
import { SacAdminComponent } from './sac-admin/sac-admin.component';
import { SacComponent } from './sac/sac.component';

const routes: Routes = [
  { path: 'logistica-entrega', component: LogisticaEntregaComponent, canActivate: [AuthGuard] },
  { path: 'controle-ocorrencia', component: ControleOcorrenciaComponent, canActivate: [AuthGuard] },
  { path: 'controle-frete', component: ControleFreteComponent, canActivate: [AuthGuard] },
  { path: 'sac-admin', component: SacAdminComponent, canActivate: [AuthGuard] },
  { path: 'home', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'sac', component: SacComponent},
  { path: 'logistica', component: LogisticaComponent},
  { path: 'login', component: LoginComponent},
  // otherwise redirect to home
  { path: '',  redirectTo: '/logistica', pathMatch: 'full' },
  // { path: '**', redirectTo: 'logistica' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
