import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/shared/notifier.service';
import { MatTableDataSource } from '@angular/material/table'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { EspecialidadeInput } from 'src/app/interfaces/input/especialidadeInput';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Especialidade } from 'src/app/interfaces/dtos/especialidade';
import { EspecialidadeService } from 'src/app/routes/especialidade.service';

@Component({
  selector: 'app-table-espec',
  templateUrl: './table-espec.component.html',
  styleUrls: ['./table-espec.component.css']
})
export class TableEspecComponent implements OnInit, AfterViewInit{
  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = ['id', 'especialidade', 'status', 'info', 'excluir'];
  Adicionar = 'Adicionar';
  Info = 'Info';

  especialidadeArray = new MatTableDataSource<Especialidade>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private especialidadeService: EspecialidadeService,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.initTable();
  }

  ngAfterViewInit() {
    this.especialidadeArray.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.especialidadeArray.filter = filterValue;
  }

  info(especialidade: Especialidade) {
    this.router.navigateByUrl(`especialidade/info/${especialidade.id}`);
  }

  ativar(especialidade: Especialidade) {
    let especialidadeInput = new EspecialidadeInput(especialidade);

    this.especialidadeService.ativar(especialidadeInput, especialidade.id!).subscribe((data) => {
      this.notifier.ShowSuccess('Especialidade ativada com sucesso!');
      window.location.reload();
    });

    window.location.reload();
  }

  openDialog(especialidade: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value, nomeComponente: "especialidade" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.especialidadeService.delete(especialidade.id).subscribe(
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
    this.especialidadeService.getAll().subscribe((data: any) => {
      var especResponse = JSON.parse(JSON.stringify(data));

      especResponse.map((especialidade: Especialidade) => {
        if (especialidade.actived) {
          especialidade.actived = 'Ativo';
        } else {
          especialidade.actived = 'Desativado';
        }
      });
      this.especialidadeArray.data = especResponse;
      this.especialidadeArray.filter = 'Ativo';
    });
  }

  getByInativo() {
    this.especialidadeArray.filter = 'Desativado';
  }

  getByAtivo() {
    this.especialidadeArray.filter = 'Ativo';
  }
}
