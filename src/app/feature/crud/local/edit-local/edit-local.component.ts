import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from 'src/app/interfaces/dtos/local';
import { LocalInput } from 'src/app/interfaces/input/localInput';
import { LocalService } from 'src/app/routes/local.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-edit-local',
  templateUrl: './edit-local.component.html',
  styleUrls: ['./edit-local.component.css'],
})
export class EditLocalComponent implements OnInit {
  formulario!: FormGroup;
  local?: Local;
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private activedRouter: ActivatedRoute,
    private localService: LocalService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.localService.getById(this.id).subscribe((res) => {
      var localResponse = JSON.parse(JSON.stringify(res));

      localResponse.created = this.utils.formatarData(localResponse.created);
      localResponse.updated = this.utils.formatarData(localResponse.updated);

      this.local = localResponse;
      this.createTable();
    });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.local?.id, disabled: true }],
      nome_local: [
        { value: this.local?.nome_local, disabled: this.isDisabled },
        Validators.required,
      ],
      rua: [
        { value: this.local?.rua, disabled: this.isDisabled },
        Validators.required,
      ],
      numero: [
        { value: this.local?.numero, disabled: this.isDisabled },
        Validators.required,
      ],
      bairro: [
        { value: this.local?.bairro, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.local?.created, disabled: true },
        Validators.required,
      ],
      updated: [
        { value: this.local?.updated, disabled: true },
        Validators.required,
      ],
    });
  }

  edit() {
    if (this.formulario.valid) {
      let localDTO = {
        nome_local: this.formulario.get('nome_local')?.value,
        rua: this.formulario.get('rua')?.value,
        numero: this.formulario.get('numero')?.value,
        bairro: this.formulario.get('bairro')?.value,
      };

      let localInput = new LocalInput(localDTO);

      this.localService.edit(localInput, this.local!.id!).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Local atualizada com sucesso!');
          this.router.navigateByUrl(`/local`);
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
    this.router.navigateByUrl(`/local/info/${this.local?.id}`);
  }
}
