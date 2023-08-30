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
    //Espec
    TableEspecComponent,
    CreateEspecComponent,
    InfoEspecComponent,
    EditEspecComponent,
    //Local
    TableLocalComponent,
    CreateLocalComponent,
    InfoLocalComponent,
    EditLocalComponent
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
