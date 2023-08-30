
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './feature/home/home.component';
import { TableEspecComponent } from './feature/crud/especialidades/table-espec/table-espec.component';
import { CreateEspecComponent } from './feature/crud/especialidades/create-espec/create-espec.component';
import { InfoEspecComponent } from './feature/crud/especialidades/info-espec/info-espec.component';
import { EditEspecComponent } from './feature/crud/especialidades/edit-espec/edit-espec.component';

export const routes: Routes = [
  // {
  //   path: 'authentication',
  //   loadChildren: () =>
  //     import('./modules/authentication/authentication.module').then(
  //       (m) => m.AuthenticationModule
  //     ),
  // },
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
    path: 'home',
    component: HomeComponent,
    // canActivate: [LoginGuardService],
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
