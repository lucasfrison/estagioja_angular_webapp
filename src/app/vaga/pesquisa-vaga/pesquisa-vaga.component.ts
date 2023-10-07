import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  selector: 'app-pesquisa-vaga',
  templateUrl: './pesquisa-vaga.component.html',
  styleUrls: ['./pesquisa-vaga.component.css'],
  imports: [ MatInputModule, MatFormFieldModule ],
  standalone: true
})
export class PesquisaVagaComponent {

}
