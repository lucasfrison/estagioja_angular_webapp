import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaVagaEstudanteComponent } from './pesquisa-vaga-estudante.component';

describe('PesquisaVagaEstudanteComponent', () => {
  let component: PesquisaVagaEstudanteComponent;
  let fixture: ComponentFixture<PesquisaVagaEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PesquisaVagaEstudanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesquisaVagaEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
