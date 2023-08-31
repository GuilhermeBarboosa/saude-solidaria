import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { User } from 'src/app/interfaces/dtos/user';
import { UserInput } from 'src/app/interfaces/input/userInput';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit, AfterViewInit {

  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'cpf',
    'role',
    'status',
    'info',
    'excluir',
  ];
  Adicionar = "Adicionar";
  Info = "Info";

  usersArray = new MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService,
  ) {}

  ngOnInit() {
    this.initTable();
  }

  ngAfterViewInit() {
    this.usersArray.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.usersArray.filter = filterValue;
  }

  info(user: User) {
    this.router.navigateByUrl(`user/info/${user.id}`);
  }

  ativar(user: User) {

    let userInput = new UserInput(user);

    this.userService.ativar(userInput, user.id!).subscribe(
      (data) => {
        this.notifier.ShowSuccess('Usuário ativado com sucesso!');
        window.location.reload();
      }
    );

    window.location.reload();
  }

  openDialog(user: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value, nomeComponente: 'usuário' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.userService.delete(user.id).subscribe(
          (data) => {
            this.notifier.ShowSuccess('Usuário excluído com sucesso!');
            window.location.reload();
          },
          (error) => {
            this.notifier.ShowError('Erro ao excluir usuário!');
          }
        );
      }
    });
  }

  initTable(){
    this.userService.getAll().subscribe((data) => {
      var usersResponse = JSON.parse(JSON.stringify(data));

      usersResponse.map((user: User) => {
        if (user.actived) {
          user.actived = 'Ativo';
        } else {
          user.actived = 'Desativado';
        }
        }

      );
      this.usersArray.data = usersResponse;
      this.usersArray.filter = "Ativo";
    });
  }


  getByInativo(){
    this.usersArray.filter = "Desativado";
  }

  getByAtivo(){
    this.usersArray.filter = "Ativo";
  }


}
