import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { TodoService } from './service/todo.service';
import { UserService } from './service/user.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './auth.guard';
import { ErrorInterceptor } from './helper/error.interceptor';
import { LogisticaComponent } from './logistica/logistica.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogisticaEntregaComponent } from './logistica-entrega/logistica-entrega.component';
import { ControleOcorrenciaComponent } from './controle-ocorrencia/controle-ocorrencia.component';
import { ControleFreteComponent } from './controle-frete/controle-frete.component';
import { SacComponent } from './sac/sac.component';
import { SacAdminComponent } from './sac-admin/sac-admin.component';

export function tokenGetter() {
    if (localStorage.getItem('access_token')){
      return localStorage.getItem('access_token').replace('Bearer ' , '');
    }else{
      return '';
    }
}

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    UserListComponent,
    LoginComponent,
    LogisticaComponent,
    LogisticaEntregaComponent,
    ControleOcorrenciaComponent,
    ControleFreteComponent,
    SacComponent,
    SacAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:9090'],
        blacklistedRoutes: ['localhost:9090/auth/ctl-acesso']
      }
    }),
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [
    TodoService,
    UserService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
