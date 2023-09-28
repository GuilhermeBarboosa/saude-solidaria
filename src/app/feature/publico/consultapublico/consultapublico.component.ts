import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConsultaService } from 'src/app/routes/consulta.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from '../../../shared/utils.service';
import { Consulta } from 'src/app/interfaces/dtos/consulta';

@Component({
  selector: 'app-consultapublico',
  templateUrl: './consultapublico.component.html',
  styleUrls: ['./consultapublico.component.css'],
})
export class ConsultapublicoComponent implements OnInit {
  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = [
    'nome_medico',
    'especialidade',
    'nome_local',
    'data',
    'info',
  ];
  Adicionar = 'Adicionar';
  Info = 'Info';

  consultaArray = new MatTableDataSource<Consulta>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private consultaService: ConsultaService,
    public dialog: MatDialog,
    private router: Router,
    private utils:UtilsService,
    private notifier: NotifierService
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
    this.router.navigateByUrl(`infoconsulta/${consulta.id}`);
  }


  initTable() {
    this.consultaService.getAll().subscribe((data: any) => {
      var consultaResponse = JSON.parse(JSON.stringify(data));

      consultaResponse.map((local: Consulta) => {
        local.data = this.utils.formatarData(local.data);
      });

      this.consultaArray.data = consultaResponse;
      this.consultaArray.filter = 'true';
      console.log(this.consultaArray.data)
    });
  }

  getByInativo() {
    this.consultaArray.filter = 'Desativado';
  }

  getByAtivo() {
    this.consultaArray.filter = 'Ativo';
  }
}
