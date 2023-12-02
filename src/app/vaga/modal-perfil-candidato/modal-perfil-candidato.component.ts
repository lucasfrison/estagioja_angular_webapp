import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-perfil-candidato',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './modal-perfil-candidato.component.html',
  styleUrls: ['./modal-perfil-candidato.component.css']
})
export class ModalPerfilCandidatoComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<ModalPerfilCandidatoComponent>
  ) {}

  ngOnInit(): void {
    
  }

  fechar(): void {
    this.dialogRef.close();
  }

}
