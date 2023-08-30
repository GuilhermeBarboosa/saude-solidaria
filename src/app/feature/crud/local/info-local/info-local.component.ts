import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from 'src/app/interfaces/dtos/local';
import { LocalService } from 'src/app/routes/local.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-info-local',
  templateUrl: './info-local.component.html',
  styleUrls: ['./info-local.component.css']
})
export class InfoLocalComponent implements OnInit {

  formulario!: FormGroup;
  local?: Local;
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  Editar = 'Editar';
  Voltar = 'Voltar';

  constructor(
    private activedRouter: ActivatedRoute,
    private localService: LocalService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.localService.getById(this.id).subscribe(
      (data) => {
        var userResponse = JSON.parse(JSON.stringify(data));
        this.local = userResponse;

        this.local!.created = this.utils.formatarData(
          this.local!.created
        );
        this.local!.updated = this.utils.formatarData(
          this.local!.updated
        );

        this.createTable();
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }

  createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.local?.id, disabled: this.isDisabled }],
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
        { value: this.local?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.local?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  edit() {
    this.router.navigateByUrl(`local/edit/${this.id}`);
  }

  return(){
    this.router.navigateByUrl('/local');
  }

  remove() {
    this.localService.delete(this.id).subscribe(
      (data) => {
        this.notifier.ShowError('Posição removida com sucesso!');
        this.router.navigateByUrl('/local');
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }

}
