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
    ],
    // canActivate: [LoginGuardService],
  },
  {
    path: 'register',
    children: [
      {
        path: '',
        component: RegisterComponent,
      },
    ],
    // canActivate: [LoginGuardService],
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
    // canActivate: [LoginGuardService],
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
    // canActivate: [LoginGuardService],
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [LoginGuardService],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
