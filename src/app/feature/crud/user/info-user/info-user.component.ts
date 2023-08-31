
import { NotifierService } from 'src/app/shared/notifier.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils.service';
import { UserService } from '../../../../routes/user.service';
import { RoleService } from 'src/app/routes/role.service';
import { User } from 'src/app/interfaces/dtos/user';
import { Role } from 'src/app/interfaces/dtos/role';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css'],
})
export class InfoUserComponent implements OnInit {
  userForm!: FormGroup;
  user?: User;
  roleArray? : Role[]
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  Editar = 'Editar';
  Voltar = 'Voltar';

  constructor(
    private activedRouter: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {

    this.userService.getById(this.id).subscribe(
      (data) => {
        var userResponse = JSON.parse(JSON.stringify(data));
        this.user = userResponse;

        console.log(this.user)

        this.user!.created = this.utils.formatarData(
          this.user!.created
        );
        this.user!.updated = this.utils.formatarData(
          this.user!.updated
        );

        this.createTable();
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }

  createTable() {
    this.userForm = this.formBuilder.group({
      id: [{ value: this.user?.id, disabled: this.isDisabled }],
      nome: [
        { value: this.user?.nome, disabled: this.isDisabled },
        Validators.required,
      ],
      email: [
        { value: this.user?.email, disabled: this.isDisabled },
        Validators.required,
      ],
      role: [
        { value: this.user?.role, disabled: this.isDisabled },
        Validators.required,
      ],
      cpf: [
        { value: this.user?.cpf, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.user?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.user?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  edit() {
    this.router.navigateByUrl(`user/edit/${this.id}`);
  }

  return(){
    this.router.navigateByUrl('/user');
  }

  remove() {
    this.userService.delete(this.id).subscribe(
      (data) => {
        this.notifier.ShowError('Usuário removido com sucesso!');
        this.router.navigateByUrl('/user');
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }

}
