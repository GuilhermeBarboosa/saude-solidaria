import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './feature/home/home.component';
import { TableEspecComponent } from './feature/crud/especialidades/table-espec/table-espec.component';
import { CreateEspecComponent } from './feature/crud/especialidades/create-espec/create-espec.component';
import { InfoEspecComponent } from './feature/crud/especialidades/info-espec/info-espec.component';
import { EditEspecComponent } from './feature/crud/especialidades/edit-espec/edit-espec.component';
import { TableLocalComponent } from './feature/crud/local/table-local/table-local.component';
import { CreateLocalComponent } from './feature/crud/local/create-local/create-local.component';
import { InfoLocalComponent } from './feature/crud/local/info-local/info-local.component';
import { EditLocalComponent } from './feature/crud/local/edit-local/edit-local.component';
import { LoginComponent } from './feature/page-login/login/login.component';
import { RegisterComponent } from './feature/page-login/register/register.component';
import { TableUserComponent } from './feature/crud/user/table-user/table-user.component';
import { CreateUserComponent } from './feature/crud/user/create-user/create-user.component';
import { InfoUserComponent } from './feature/crud/user/info-user/info-user.component';
import { EditUserComponent } from './feature/crud/user/edit-user/edit-user.component';
import { ConsultapublicoComponent } from './feature/publico/consultapublico/consultapublico.component';
import { InfoConsultapublicaComponent } from './feature/publico/info-consultapublica/info-consultapublica.component';
import { TableConsultaComponent } from './feature/crud/consultas/table-consulta/table-consulta.component';
import { CreateConsultaComponent } from './feature/crud/consultas/create-consulta/create-consulta.component';
import { InfoConsultaComponent } from './feature/crud/consultas/info-consulta/info-consulta.component';
import { LoginGuardService } from './guards/login-guard.service';
import { EditConsultaComponent } from './feature/crud/consultas/edit-consulta/edit-consulta.component';

export const routes: Routes = [
  // {
  //   path: 'authentication',
  //   loadChildren: () =>
  //     import('./modules/authentication/authentication.module').then(
  //       (m) => m.AuthenticationModule
  //     ),
  // },
  {
    path: 'login',
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ]
  },
  {
    path: 'register',
    children: [
      {
        path: '',
        component: RegisterComponent,
      },
    ]
  },
  {
    path: 'user',
    children: [
      {
        path: '',
        component: TableUserComponent,
      },
      {
        path: 'register',
        component: CreateUserComponent,
      },
      {
        path: 'info/:id',
        component: InfoUserComponent,
      },
      {
        path: 'edit/:id',
        component: EditUserComponent,
      },
    ],
    canActivate: [LoginGuardService],
  },
  {
    path: 'especialidade',
    children: [
      {
        path: '',
        component: TableEspecComponent,
      },
      {
        path: 'register',
        component: CreateEspecComponent,
      },
      {
        path: 'info/:id',
        component: InfoEspecComponent,
      },
      {
        path: 'edit/:id',
        component: EditEspecComponent,
      },
    ],
    canActivate: [LoginGuardService],
  },
  {
    path: 'cms',
    children: [
      {
        path: '',
        component: TableLocalComponent,
      },
    ],
    canActivate: [LoginGuardService],
  },
  {
    path: 'consultapublico',
    children: [
      {
        path: '',
        component: ConsultapublicoComponent,
      },
    ]
  },
  {
    path: 'infoconsulta',
    children: [
      {
        path: ':id',
        component: InfoConsultapublicaComponent,
      },
    ]
  },
  {
    path: 'local',
    children: [
      {
        path: '',
        component: TableLocalComponent,
      },
      {
        path: 'register',
        component: CreateLocalComponent,
      },
      {
        path: 'info/:id',
        component: InfoLocalComponent,
      },
      {
        path: 'edit/:id',
        component: EditLocalComponent,
      },
    ],
   canActivate: [LoginGuardService],
  },
  {
    path: 'consulta',
    children: [
      {
        path: '',
        component: TableConsultaComponent,
      },
      {
        path: 'register',
        component: CreateConsultaComponent,
      },
      {
        path: 'info/:id',
        component: InfoConsultaComponent,
      },
      {
        path: 'edit/:id',
        component: EditConsultaComponent,
      },
    ],
    canActivate: [LoginGuardService],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
