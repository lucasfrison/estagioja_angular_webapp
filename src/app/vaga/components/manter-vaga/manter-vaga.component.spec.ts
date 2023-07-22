import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterVagaComponent } from './manter-vaga.component';

describe('ManterVagaComponent', () => {
  let component: ManterVagaComponent;
  let fixture: ComponentFixture<ManterVagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManterVagaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManterVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
