import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from 'src/app/interfaces/dtos/consulta';
import { ConsultaService } from 'src/app/routes/consulta.service';
import { LocalService } from 'src/app/routes/local.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-info-consulta',
  templateUrl: './info-consulta.component.html',
  styleUrls: ['./info-consulta.component.css']
})
export class InfoConsultaComponent implements OnInit {
  formulario!: FormGroup;
  consulta?: Consulta;
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  Editar = 'Editar';
  Voltar = 'Voltar';

  constructor(
    private activedRouter: ActivatedRoute,
    private consultaService: ConsultaService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.consultaService.getById(this.id).subscribe(
      (data) => {
        var consultaResponse = JSON.parse(JSON.stringify(data));
        this.consulta = consultaResponse;

        this.consulta!.created = this.utils.formatarData(
          this.consulta!.created
        );
        this.consulta!.updated = this.utils.formatarData(
          this.consulta!.updated
        );
        this.consulta!.data = this.utils.formatarData(this.consulta?.data)

        this.createTable();
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }

  createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.consulta?.id, disabled: this.isDisabled }],
      nome_local: [
        { value: this.consulta?.nome_local, disabled: this.isDisabled },
        Validators.required,
      ],
      data: [
        { value: this.consulta?.data, disabled: this.isDisabled },
        Validators.required,
      ],
      rua: [
        { value: this.consulta?.rua, disabled: this.isDisabled },
        Validators.required,
      ],
      numero: [
        { value: this.consulta?.numero, disabled: this.isDisabled },
        Validators.required,
      ],
      bairro: [
        { value: this.consulta?.bairro, disabled: this.isDisabled },
        Validators.required,
      ],
      nome_medico: [
        { value: this.consulta?.nome_medico, disabled: this.isDisabled },
        Validators.required,
      ],
      crm: [
        { value: this.consulta?.crm, disabled: this.isDisabled },
        Validators.required,
      ],
      email_medico: [
        { value: this.consulta?.email_medico, disabled: this.isDisabled },
        Validators.required,
      ]
    });
  }

  edit() {
    this.router.navigateByUrl(`consulta/edit/${this.id}`);
  }

  return(){
    this.router.navigateByUrl('/consulta');
  }

  remove() {
    this.consultaService.delete(this.id).subscribe(
      (data) => {
        this.notifier.ShowError('Posição removida com sucesso!');
        this.router.navigateByUrl('/consulta');
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }
}
