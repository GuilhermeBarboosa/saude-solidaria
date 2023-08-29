
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './feature/home/home.component';

export const routes: Routes = [
  // {
  //   path: 'authentication',
  //   loadChildren: () =>
  //     import('./modules/authentication/authentication.module').then(
  //       (m) => m.AuthenticationModule
  //     ),
  // },
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
