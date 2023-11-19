import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacoesComponent } from './notificacoes-empresa.component';

describe('NotificacoesEmpresaComponent', () => {
  let component: NotificacoesComponent;
  let fixture: ComponentFixture<NotificacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NotificacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
