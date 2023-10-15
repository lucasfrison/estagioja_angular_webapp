import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizaEmpresaComponent } from './visualiza-empresa.component';

describe('VisualizaEmpresaComponent', () => {
  let component: VisualizaEmpresaComponent;
  let fixture: ComponentFixture<VisualizaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VisualizaEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
