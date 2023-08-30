import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidade } from 'src/app/interfaces/dtos/especialidade';
import { EspecialidadeInput } from 'src/app/interfaces/input/especialidadeInput';
import { EspecialidadeService } from 'src/app/routes/especialidade.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-edit-espec',
  templateUrl: './edit-espec.component.html',
  styleUrls: ['./edit-espec.component.css']
})
export class EditEspecComponent implements OnInit {

  formulario!: FormGroup;
  especialidade?: Especialidade;
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private activedRouter: ActivatedRoute,
    private especialidadeService: EspecialidadeService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.especialidadeService.getById(this.id).subscribe((res) => {
      var especialidadeResponse = JSON.parse(JSON.stringify(res));

      especialidadeResponse.created = this.utils.formatarData(
        especialidadeResponse.created
      );
      especialidadeResponse.updated = this.utils.formatarData(
        especialidadeResponse.updated
      );

      this.especialidade = especialidadeResponse;
      this.createTable();
    });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.especialidade?.id, disabled: true }],
      especialidade: [
        { value: this.especialidade?.especialidade, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.especialidade?.created, disabled: true },
        Validators.required,
      ],
      updated: [
        { value: this.especialidade?.updated, disabled: true },
        Validators.required,
      ],
    });
  }

  edit() {
    if (this.formulario.valid) {
      let especialidadeDTO = {
        especialidade: this.formulario.get('especialidade')?.value,
      };

      let especialidadeInput = new EspecialidadeInput(especialidadeDTO);

      this.especialidadeService.edit(especialidadeInput, this.especialidade!.id!).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Especialidade atualizada com sucesso!');
          this.router.navigateByUrl(`/especialidade`);
        },
        (error) => {
          this.notifier.ShowError(error.error);
          return;
        }
      );
    } else {
      this.notifier.ShowInfo('Preencha todos os campos!');
    }
  }

  return() {
    this.router.navigateByUrl(`/especialidade/info/${this.especialidade?.id}`);
  }
}
