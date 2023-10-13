import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarEstudanteComponent } from './visualizar-estudante.component';

describe('VisualizarEstudanteComponent', () => {
  let component: VisualizarEstudanteComponent;
  let fixture: ComponentFixture<VisualizarEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarEstudanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
