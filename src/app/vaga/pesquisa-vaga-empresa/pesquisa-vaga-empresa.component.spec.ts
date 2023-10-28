import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaVagaEmpresaComponent } from './pesquisa-vaga-empresa.component';

describe('PesquisaVagaEmpresaComponent', () => {
  let component: PesquisaVagaEmpresaComponent;
  let fixture: ComponentFixture<PesquisaVagaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PesquisaVagaEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesquisaVagaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
