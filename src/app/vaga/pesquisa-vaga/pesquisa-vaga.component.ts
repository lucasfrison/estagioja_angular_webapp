import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-pesquisa-vaga',
  templateUrl: './pesquisa-vaga.component.html',
  styleUrls: ['./pesquisa-vaga.component.css'],
  imports: [ MatInputModule, MatFormFieldModule, MatIconModule ],
  standalone: true
})

export class PesquisaVagaComponent {

}
