import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicialEmpresaComponent } from './inicial-empresa.component';

describe('InicialEmpresaComponent', () => {
  let component: InicialEmpresaComponent;
  let fixture: ComponentFixture<InicialEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicialEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicialEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
