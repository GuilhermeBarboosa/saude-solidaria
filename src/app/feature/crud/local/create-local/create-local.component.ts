import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Local } from 'src/app/interfaces/dtos/local';
import { LocalInput } from 'src/app/interfaces/input/localInput';
import { LocalService } from 'src/app/routes/local.service';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-create-local',
  templateUrl: './create-local.component.html',
  styleUrls: ['./create-local.component.css']
})
export class CreateLocalComponent implements OnInit {

  local!: Local;
  formulario!: FormGroup;
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private router: Router,
    private localService: LocalService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.createTable();
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      nome_local: ['', [Validators.required, Validators.minLength(3)]],
      rua: ['', [Validators.required, Validators.minLength(3)]],
      numero: ['', [Validators.required]],
      bairro: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  save() {
    if (this.formulario.valid) {
      let localDto = {
        nome_local: this.formulario.get('nome_local')?.value,
        rua: this.formulario.get('rua')?.value,
        numero: this.formulario.get('numero')?.value,
        bairro: this.formulario.get('bairro')?.value,
      };

      let localInput = new LocalInput(localDto);

      console.log(localInput)

      this.localService.create(localInput).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Local cadastrada com sucesso!');
          this.router.navigateByUrl('/local');
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
    this.router.navigateByUrl('/local');
  }

}
