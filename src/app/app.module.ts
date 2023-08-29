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
    TableEspecComponent,
    CreateEspecComponent
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
