import { NotifierService } from 'src/app/shared/notifier.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/routes/role.service';

import { UtilsService } from 'src/app/shared/utils.service';
import { UserService } from '../../../../routes/user.service';
import { User } from 'src/app/interfaces/dtos/user';
import { Role } from 'src/app/interfaces/dtos/role';
import { UserInput } from 'src/app/interfaces/input/userInput';
import { EspecialidadeService } from 'src/app/routes/especialidade.service';
import { Especialidade } from 'src/app/interfaces/dtos/especialidade';
import { UserMedico } from 'src/app/interfaces/dtos/UserMedico';
import { UserMedicoService } from 'src/app/routes/userMedico.service';
import { UserMedicoInput } from 'src/app/interfaces/input/userMedicoInput';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  user?: UserMedico;
  roleArray?: Role[];
  especArray?: Especialidade[];
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private activedRouter: ActivatedRoute,
    private userService: UserMedicoService,
    private roleService: RoleService,
    private especialidadeService: EspecialidadeService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.roleService.getAll().subscribe((data) => {
      var roleResponse = JSON.parse(JSON.stringify(data));
      
      this.roleArray = roleResponse;
    });


    this.userService.getById(this.id).subscribe((res) => {
      var userResponse = JSON.parse(JSON.stringify(res));

      userResponse.created = this.utils.formatarData(
        userResponse.created
      );
      userResponse.updated = this.utils.formatarData(
        userResponse.updated
      );

      this.user = userResponse;

      this.createTable();
    });

    this.especialidadeService.getAll().subscribe(
      (data) => {
        var especResponse = JSON.parse(JSON.stringify(data));
        this.especArray = especResponse;
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }

  async createTable() {
    this.userForm = this.formBuilder.group({
      id: [{ value: this.user?.id, disabled: true }],
      nome: [
        { value: this.user?.nome_user, disabled: this.isDisabled },
        Validators.required,
      ],
      email: [
        { value: this.user?.email_user, disabled: this.isDisabled },
        Validators.required,
      ],
      senha: [{ value: '', disabled: this.isDisabled }, Validators.required],
      role: [
        { value: this.user?.id_role, disabled: this.isDisabled },
        Validators.required,
      ],
      cpf : [
        { value: this.user?.cpf_user, disabled: this.isDisabled },
        Validators.required,
      ],
      crm : [
        { value: this.user?.crm, disabled: this.isDisabled },
        Validators.required,
      ],
      especialidade : [
        { value: this.user?.id_especialidade, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.user?.created, disabled: true },
        Validators.required,
      ],
      updated: [
        { value: this.user?.updated, disabled: true },
        Validators.required,
      ],
    });
  }

  edit() {
    if (this.userForm.valid) {
      let userDTO = {
        nome: this.userForm.get('nome')?.value,
        cpf: this.userForm.get('cpf')?.value,
        email: this.userForm.get('email')?.value,
        senha: this.userForm.get('senha')?.value,
        id_user: this.user?.id_user,
        role: this.userForm.get('role')?.value,
        crm: this.userForm.get('crm')?.value,
        especialidade: this.userForm.get('especialidade')?.value,
      };

      let userInput = new UserMedicoInput(userDTO);

      this.userService.edit(userInput, this.user!.id!).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Usuário atualizado com sucesso!');
          this.router.navigateByUrl(`/user`);
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
    this.router.navigateByUrl(`/user/info/${this.user?.id}`);
  }
}
