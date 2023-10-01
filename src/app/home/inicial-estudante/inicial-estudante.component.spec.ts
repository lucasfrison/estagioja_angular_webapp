import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicialEstudanteComponent } from './inicial-estudante.component';

describe('InicialEstudanteComponent', () => {
  let component: InicialEstudanteComponent;
  let fixture: ComponentFixture<InicialEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicialEstudanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicialEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
