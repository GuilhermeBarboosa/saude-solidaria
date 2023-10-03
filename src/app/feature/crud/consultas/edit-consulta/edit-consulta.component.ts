import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-consulta',
  templateUrl: './edit-consulta.component.html',
  styleUrls: ['./edit-consulta.component.css']
})
export class EditConsultaComponent implements OnInit {
  consulta!: Consulta;
  medicoArray?: UserMedico[];
  localArray?: Local[];
  consultaForm!: FormGroup;
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private activedRouter: ActivatedRoute,
    private router: Router,
    private userMedicoService: UserMedicoService,
    private consultaService: ConsultaService,
    private localService: LocalService,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.userMedicoService.getAll().subscribe(
      (data) => {
        var roleResponse = JSON.parse(JSON.stringify(data));
        this.medicoArray = roleResponse;

        this.createTable();
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );

    this.localService.getAll().subscribe(
      (data) => {
        var especResponse = JSON.parse(JSON.stringify(data));
        this.localArray = especResponse;
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );

    this.consultaService.getById(this.id).subscribe((res) => {
      var consultaResponse = JSON.parse(JSON.stringify(res));

      consultaResponse.data = this.utils.formatarData(consultaResponse.data);
      this.consulta = consultaResponse;

      this.createTable();
    });
  }

  async createTable() {
    this.consultaForm = this.formBuilder.group({
      id: [{ value: this.consulta?.id, disabled: this.isDisabled }],
      data: [{ value: this.consulta?.data, disabled: this.isDisabled }, Validators.required],
      medico: [{ value: this.consulta?.id_medico, disabled: this.isDisabled }, Validators.required],
      local: [{ value: this.consulta?.id_local, disabled: this.isDisabled }, Validators.required],
    });

  }

  edit() {
    if (this.consultaForm.valid) {
      let consultaDTO = {
        data : this.consultaForm.get('data')?.value,
        medico : this.consultaForm.get('medico')?.value,
        local : this.consultaForm.get('local')?.value,
      };

      let consultaInput = new ConsultaInput(consultaDTO);

      if(this.utils.validarData(String(consultaInput.data)) == false){
        this.notifier.ShowError('Data invalida');
        return;
      }else{
        consultaInput.data = this.utils.formatarDataToSQL(consultaInput.data);

        this.consultaService.edit(consultaInput, this.id!).subscribe(
          (data) => {
            this.notifier.ShowSuccess('Consulta atualizado com sucesso!');
            this.router.navigateByUrl(`/consulta`);
          },
          (error) => {
            this.notifier.ShowError(error.error);
            return;
          }
        );
      }

    } else {
      this.notifier.ShowInfo('Preencha todos os campos!');
    }
  }

  return() {
    this.router.navigateByUrl(`/consulta/info/${this.id}`);
  }

}
