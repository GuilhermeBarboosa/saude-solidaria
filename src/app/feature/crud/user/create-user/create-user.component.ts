import { NotifierService } from 'src/app/shared/notifier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../../routes/user.service';
import { Role } from 'src/app/interfaces/dtos/role';
import { UserInput } from 'src/app/interfaces/input/userInput';
import { User } from 'src/app/interfaces/dtos/user';
import { RoleService } from '../../../../routes/role.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  user!: User;
  roleArray?: Role[];
  userForm!: FormGroup;
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.roleService.getAll().subscribe(
      (data) => {
        var roleResponse = JSON.parse(JSON.stringify(data));
        this.roleArray = roleResponse;

        this.createTable();
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }

  async createTable() {
    this.userForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(3)],
      ],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  save() {
    console.log(this.userForm);

    if (this.userForm.valid) {
      let userDTO = {
        nome: this.userForm.get('nome')?.value,
        email: this.userForm.get('email')?.value,
        senha: this.userForm.get('senha')?.value,
        cpf: this.userForm.get('cpf')?.value,
        role: this.userForm.get('role')?.value,
      };

      let userInput = new UserInput(userDTO);

      this.userService.create(userInput).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Usuário cadastrado com sucesso!');
          this.router.navigateByUrl('/user');
        },
        (error) => {
          this.notifier.ShowError(error.error);
        }
      );
    } else {
      console.log(this.userForm);
      this.notifier.ShowError('Formulário inválido!');
    }
  }

  return() {
    this.router.navigateByUrl('/user');
  }
}
