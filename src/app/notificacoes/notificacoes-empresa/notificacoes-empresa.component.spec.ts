import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacoesEmpresaComponent } from './notificacoes-empresa.component';

describe('NotificacoesEmpresaComponent', () => {
  let component: NotificacoesEmpresaComponent;
  let fixture: ComponentFixture<NotificacoesEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NotificacoesEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacoesEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
