import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserMedico } from 'src/app/interfaces/dtos/UserMedico';
import { Consulta } from 'src/app/interfaces/dtos/consulta';
import { Local } from 'src/app/interfaces/dtos/local';
import { ConsultaInput } from 'src/app/interfaces/input/consultaInput';
import { ConsultaService } from 'src/app/routes/consulta.service';
import { LocalService } from 'src/app/routes/local.service';
import { UserMedicoService } from 'src/app/routes/userMedico.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-create-consulta',
  templateUrl: './create-consulta.component.html',
  styleUrls: ['./create-consulta.component.css'],
})
export class CreateConsultaComponent implements OnInit {
  consulta!: Consulta;
  medicoArray?: UserMedico[];
  localArray?: Local[];
  consultaForm!: FormGroup;
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private router: Router,
    private userMedicoService: UserMedicoService,
    private consultaService: ConsultaService,
    private localService: LocalService,
    private formBuilder: FormBuilder,
    private utils: UtilsService,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.userMedicoService.getAll().subscribe(
      (data) => {
        var medicoResponse = JSON.parse(JSON.stringify(data));
        // this.medicoArray = medicoResponse;

        medicoResponse.forEach((element: UserMedico) => {
          if(element.actived){
            (this.medicoArray ??= []).push(element);
          }
        });


        this.createTable();
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );

    this.localService.getAll().subscribe(
      (data) => {
        var especResponse = JSON.parse(JSON.stringify(data));
        // this.localArray = especResponse;

        especResponse.forEach((element: Local) => {
          if(element.actived){
            (this.localArray ??= []).push(element);
          }
        });
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }

  async createTable() {
    this.consultaForm = this.formBuilder.group({
      data: ['', Validators.required],
      medico: ['', Validators.required],
      local: ['', Validators.required],
    });
  }

  save() {
    if (this.consultaForm.valid) {
      let consultaDTO = {
        data: this.consultaForm.get('data')?.value,
        medico: this.consultaForm.get('medico')?.value,
        local: this.consultaForm.get('local')?.value,
      };
      if (this.utils.validarData(String(consultaDTO.data)) == false) {
        this.notifier.ShowError('Data invalida');
      } else {
        consultaDTO.data = this.utils.formatarDataToSQL(consultaDTO.data);

        let consultaInput = new ConsultaInput(consultaDTO);

        this.consultaService.create(consultaInput).subscribe(
          (data) => {
            this.notifier.ShowSuccess('Consulta cadastrada com sucesso!');
            this.router.navigateByUrl('/consulta');
          },
          (error) => {
            this.notifier.ShowError(error.error);
          }
        );
      }
    } else {
      this.notifier.ShowError('Formulário inválido!');
    }
  }

  return() {
    this.router.navigateByUrl('/consulta');
  }
}
