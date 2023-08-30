import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { EspecialidadeService } from '../../../routes/especialidade.service';
import { Especialidade } from 'src/app/interfaces/dtos/especialidade';
import { UserInput } from 'src/app/interfaces/input/userInput';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private especialidadeService: EspecialidadeService,
    private notifier: NotifierService
  ) {}

  // user!: User;
  formulario!: FormGroup;
  especialidadeArray = [] as Especialidade[];

  ngOnInit() {
    this.especialidadeService.getAll().subscribe((data) => {
      var posicaoResponse = JSON.parse(JSON.stringify(data));
      let array = posicaoResponse;

      array.forEach((especialidade: Especialidade) => {
        if (especialidade.id! != 1) {
          this.especialidadeArray.push(especialidade);
        }
      });
    });

    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      crm: ['', [Validators.required, Validators.minLength(3)]],
      especialidade: ['', Validators.required],
      role: [2, Validators.required],
    });
  }

  registrar() {
    // if (this.formulario.valid) {
    //   let userDTO = {
    //     nome: this.formulario.get('nome')?.value,
    //     idade: this.formulario.get('idade')?.value,
    //     telefone: this.formulario.get('telefone')?.value,
    //     cpf: this.formulario.get('cpf')?.value,
    //     email: this.formulario.get('email')?.value,
    //     senha: this.formulario.get('senha')?.value,
    //     especialidade: this.formulario.get('especialidade')?.value,
    //     role: this.formulario.get('role')?.value,
    //   };

    //   let userInput = new UserInput(userDTO);

    //   this.userService.create(userInput).subscribe(
    //     (data) => {
    //       this.notifier.ShowSuccess('Usuário cadastrado com sucesso!');

    //       localStorage.setItem('email', userDTO.email);

    //       this.router.navigateByUrl('/authentication/login');
    //     },
    //     (error) => {
    //       this.notifier.ShowError(error.error);
    //     }
    //   );
    // } else {
    //   this.notifier.ShowError('Formulário inválido!');
    // }
  }
}
