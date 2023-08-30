import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidade } from 'src/app/interfaces/dtos/especialidade';
import { EspecialidadeService } from 'src/app/routes/especialidade.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-info-espec',
  templateUrl: './info-espec.component.html',
  styleUrls: ['./info-espec.component.css']
})
export class InfoEspecComponent implements OnInit {

  formulario!: FormGroup;
  especialidade?: Especialidade;
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  Editar = 'Editar';
  Voltar = 'Voltar';

  constructor(
    private activedRouter: ActivatedRoute,
    private especialidadeService: EspecialidadeService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.especialidadeService.getById(this.id).subscribe(
      (data) => {
        var userResponse = JSON.parse(JSON.stringify(data));
        this.especialidade = userResponse;

        this.especialidade!.created = this.utils.formatarData(
          this.especialidade!.created
        );
        this.especialidade!.updated = this.utils.formatarData(
          this.especialidade!.updated
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
      id: [{ value: this.especialidade?.id, disabled: this.isDisabled }],
      especialidade: [
        { value: this.especialidade?.especialidade, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.especialidade?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.especialidade?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  edit() {
    this.router.navigateByUrl(`especialidade/edit/${this.id}`);
  }

  return(){
    this.router.navigateByUrl('/especialidade');
  }

  remove() {
    this.especialidadeService.delete(this.id).subscribe(
      (data) => {
        this.notifier.ShowError('Posição removida com sucesso!');
        this.router.navigateByUrl('/especialidade');
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }

}
