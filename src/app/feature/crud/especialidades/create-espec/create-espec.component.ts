import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidade } from 'src/app/interfaces/dtos/especialidade';
import { EspecialidadeInput } from 'src/app/interfaces/input/especialidadeInput';
import { EspecialidadeService } from 'src/app/routes/especialidade.service';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-create-espec',
  templateUrl: './create-espec.component.html',
  styleUrls: ['./create-espec.component.css']
})
export class CreateEspecComponent {
  especialidade!: Especialidade;
  formulario!: FormGroup;
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private router: Router,
    private especialidadeService: EspecialidadeService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.createTable();
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      especialidade: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  save() {
    if (this.formulario.valid) {
      let especialidadeDto = {
        especialidade: this.formulario.get('especialidade')?.value,
      };

      let especialidadeInput = new EspecialidadeInput(especialidadeDto);

      this.especialidadeService.create(especialidadeInput).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Especialidade cadastrada com sucesso!');
          this.router.navigateByUrl('/especialidade');
        },
        (error) => {
          this.notifier.ShowError(error.error);
        }
      );
    } else {
      this.notifier.ShowError('Formulário inválido!');
    }
  }

  return() {
    this.router.navigateByUrl('/especialidade');
  }
}
