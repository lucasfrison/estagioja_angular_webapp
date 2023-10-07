import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksPerfilComponent } from './links-perfil.component';

describe('LinksPerfilComponent', () => {
  let component: LinksPerfilComponent;
  let fixture: ComponentFixture<LinksPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinksPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinksPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
