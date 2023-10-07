import { TestBed } from '@angular/core/testing';

import { AuthGuardEstudanteService } from './auth-guard-estudante.service';

describe('AuthGuardEstudanteService', () => {
  let service: AuthGuardEstudanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardEstudanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
