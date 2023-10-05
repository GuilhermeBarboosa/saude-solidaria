import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from 'src/app/interfaces/dtos/consulta';
import { ConsultaService } from 'src/app/routes/consulta.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-info-consultapublica',
  templateUrl: './info-consultapublica.component.html',
  styleUrls: ['./info-consultapublica.component.css'],
})
export class InfoConsultapublicaComponent implements OnInit {
  formulario!: FormGroup;
  consulta?: Consulta;
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  Editar = 'Editar';
  Voltar = 'Voltar';
  query = "";
  constructor(
    private activedRouter: ActivatedRoute,
    private consultaService: ConsultaService
  ) {}

  ngOnInit() {
    this.consultaService.getById(this.id).subscribe(
      (data) => {
        this.consulta = JSON.parse(JSON.stringify(data));

        let rua = this.consulta?.rua.replaceAll(" ", "+");
        let bairro = this.consulta?.bairro.replaceAll(" ", "+");
        let numero = this.consulta?.numero.replaceAll(" ", "+");
        let concat = `${rua}+${bairro}+${numero}`
        this.query = `https://www.google.com/maps?q=${concat}`
      }
    );
  }
}
