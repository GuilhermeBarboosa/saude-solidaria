import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Local } from 'src/app/interfaces/dtos/local';
import { LocalInput } from 'src/app/interfaces/input/localInput';
import { LocalService } from 'src/app/routes/local.service';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-table-local',
  templateUrl: './table-local.component.html',
  styleUrls: ['./table-local.component.css']
})
export class TableLocalComponent implements OnInit, AfterViewInit {

  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = ['id', 'nome_local', 'rua', 'numero', 'bairro',  'status', 'info', 'excluir'];
  Adicionar = 'Adicionar';
  Info = 'Info';

  localArray = new MatTableDataSource<Local>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private localService: LocalService,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.initTable();
  }

  ngAfterViewInit() {
    this.localArray.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.localArray.filter = filterValue;
  }

  info(local: Local) {
    this.router.navigateByUrl(`local/info/${local.id}`);
  }

  ativar(local: Local) {
    let localInput = new LocalInput(local);

    this.localService.ativar(localInput, local.id!).subscribe((data) => {
      this.notifier.ShowSuccess('Local ativada com sucesso!');
      window.location.reload();
    });

    window.location.reload();
  }

  openDialog(local: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value, nomeComponente: "local" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.localService.delete(local.id).subscribe(
          (data: any) => {
            this.notifier.ShowSuccess('Posição excluída com sucesso!');
            window.location.reload();
          },
          (error: any) => {
            this.notifier.ShowError('Erro ao excluir posição!');
          }
        );
      }
    });
  }

  initTable() {
    this.localService.getAll().subscribe((data: any) => {
      var localResponse = JSON.parse(JSON.stringify(data));

      localResponse.map((local: Local) => {
        if (local.actived) {
          local.actived = 'Ativo';
        } else {
          local.actived = 'Desativado';
        }
      });
      this.localArray.data = localResponse;
      this.localArray.filter = 'Ativo';
    });
  }

  getByInativo() {
    this.localArray.filter = 'Desativado';
  }

  getByAtivo() {
    this.localArray.filter = 'Ativo';
  }

}
