import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomeComponent } from './feature/home/home.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ButtonGreenComponent } from './components/button-green/button-green.component';
import { ButtonRedComponent } from './components/button-red/button-red.component';
import { ButtonYellowComponent } from './components/button-yellow/button-yellow.component';
import { ToastrModule } from 'ngx-toastr';
import { TableEspecComponent } from './feature/crud/especialidades/table-espec/table-espec.component';
import { CreateEspecComponent } from './feature/crud/especialidades/create-espec/create-espec.component';
import {MatTableModule} from '@angular/material/table';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
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
import { EditUserComponent } from './feature/crud/user/edit-user/edit-user.component';
import { InfoUserComponent } from './feature/crud/user/info-user/info-user.component';
import { ConsultapublicoComponent } from './feature/publico/consultapublico/consultapublico.component';
import { InfoConsultapublicaComponent } from './feature/publico/info-consultapublica/info-consultapublica.component';
import { TableConsultaComponent } from './feature/crud/consultas/table-consulta/table-consulta.component';
import { CreateConsultaComponent } from './feature/crud/consultas/create-consulta/create-consulta.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { InfoConsultaComponent } from './feature/crud/consultas/info-consulta/info-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    DialogComponent,
    ButtonGreenComponent,
    ButtonRedComponent,
    ButtonYellowComponent,
    //Login
    LoginComponent,
    RegisterComponent,
    //User
    TableUserComponent,
    CreateUserComponent,
    EditUserComponent,
    InfoUserComponent,
    //Espec
    TableEspecComponent,
    CreateEspecComponent,
    InfoEspecComponent,
    EditEspecComponent,
    //Local
    TableLocalComponent,
    CreateLocalComponent,
    InfoLocalComponent,
    EditLocalComponent,
    //Constula
    TableConsultaComponent,
    CreateConsultaComponent,
    InfoConsultaComponent,
    //ConsultaPublico
    ConsultapublicoComponent,
    InfoConsultapublicaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false // ao salvar, vai manter a mascara
    }),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
