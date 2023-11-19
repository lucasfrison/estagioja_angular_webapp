import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacoesEstudanteComponent } from './notificacoes-estudante.component';

describe('NotificacoesEstudanteComponent', () => {
  let component: NotificacoesEstudanteComponent;
  let fixture: ComponentFixture<NotificacoesEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NotificacoesEstudanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacoesEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
