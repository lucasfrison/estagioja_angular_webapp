import { Component, Input, OnInit } from '@angular/core';
import { ManterVagaComponent } from '../manter-vaga/manter-vaga.component';
import { ActivatedRoute } from '@angular/router';//solicita parametros url


@Component({
  selector: 'app-alterar-vaga',
  templateUrl: './alterar-vaga.component.html',
  styleUrls: ['./alterar-vaga.component.css'],
  imports : [ManterVagaComponent],
  standalone: true

})
export class AlterarVagaComponent implements OnInit {

  id!: number;

  constructor(private route: ActivatedRoute){}


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
  }

}
