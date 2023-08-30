import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  Sim = 'Sim';
  Nao = 'Não';
  nome: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      data.value = true;
      data.nomeComponente = data.nomeComponente
    }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
