import { Component, Inject, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Estudante } from 'src/app/shared/models/estudante.model';
import { Turno } from 'src/app/shared/models/turno.model';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-modal-perfil-candidato',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './modal-perfil-candidato.component.html',
  styleUrls: ['./modal-perfil-candidato.component.css']
})
export class ModalPerfilCandidatoComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<ModalPerfilCandidatoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Estudante 
  ) {}

  ngOnInit(): void {
    
  }

  fechar(): void {
    this.dialogRef.close();
  }

  getPlaceholderCompetencias(): string {
    if (!this.data.competencias) return 'Competências';
    let competenciasStr = '';
    this.data.competencias.forEach(
      comp => competenciasStr += `${comp.descricao}; `
    );
    return competenciasStr;
  }

  getTurnoString(): string {
    return Turno[this.data.curso?.turno!];
  }

}
