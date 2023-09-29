import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Consulta } from 'src/app/interfaces/dtos/consulta';
import { ConsultaInput } from 'src/app/interfaces/input/consultaInput';
import { ConsultaService } from 'src/app/routes/consulta.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-table-consulta',
  templateUrl: './table-consulta.component.html',
  styleUrls: ['./table-consulta.component.css']
})
export class TableConsultaComponent implements OnInit {

  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = [
    'id',
    'nome_local',
    'nome_medico',
    'crm',
    'data',
    'status',
    'info',
    'excluir',
  ];
  Adicionar = 'Adicionar';
  Info = 'Info';

  consultaArray = new MatTableDataSource<Consulta>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private consultaService: ConsultaService,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.initTable();
  }

  ngAfterViewInit() {
    this.consultaArray.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.consultaArray.filter = filterValue;
  }

  info(consulta: Consulta) {
    this.router.navigateByUrl(`consulta/info/${consulta.id}`);
  }

  ativar(consulta: Consulta) {
    let localInput = new ConsultaInput(consulta);

    this.consultaService.ativar(consulta.id!).subscribe(
      (data) => {
        this.notifier.ShowSuccess('Consulta ativada com sucesso!');
      },
      (error) => {
        this.notifier.ShowError('Erro ao ativar consulta!');
      }
    );

    window.location.reload();
  }

  openDialog(consulta: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value, nomeComponente: 'consulta' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.consultaService.delete(consulta.id).subscribe(
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
    this.consultaService.getAll().subscribe((data: any) => {
      var consultaResponse = JSON.parse(JSON.stringify(data));

      consultaResponse.map((consulta: Consulta) => {
        if (consulta.actived) {
          consulta.actived = 'Ativo';
        } else {
          consulta.actived = 'Desativado';
        }

        consulta.data = this.utils.formatarData(consulta.data)

      });
      this.consultaArray.data = consultaResponse;
      this.consultaArray.filter = 'Ativo';
    });
  }

  getByInativo() {
    this.consultaArray.filter = 'Desativado';
  }

  getByAtivo() {
    this.consultaArray.filter = 'Ativo';
  }

}
