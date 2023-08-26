import { Component, Input, OnInit } from '@angular/core';
import { ManterVagaComponent } from '../manter-vaga/manter-vaga.component';
import { Vaga } from 'src/app/shared/models/vaga.model';
import { VagaService } from 'src/app/services/vaga.service';
import { ActivatedRoute } from '@angular/router';//solicita parametros url


@Component({
  selector: 'app-alterar-vaga',
  templateUrl: './alterar-vaga.component.html',
  styleUrls: ['./alterar-vaga.component.css'],
  imports : [ManterVagaComponent],
  standalone: true

})
export class AlterarVagaComponent implements OnInit {

  alterarVaga!: Vaga;
  snackBar: any;
  id!: number;

  constructor(
    private vagaService: VagaService,
    private route: ActivatedRoute
  ){

  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Converta o valor para o tipo adequado
      // Use o ID para carregar os detalhes do item com o ID fornecido
    });
    this.buscarVagaId(this.id);
  }

  buscarVagaId(id: number) {   
    this.vagaService.buscarPorId(id).subscribe((response) => {
      this.alterarVaga = response;
      console.log(this.alterarVaga);
    },
    (error) => {
      console.log(error);
    });
  }

}
