import { TestBed } from '@angular/core/testing';
import { AuthGuardEmpresaService } from './auth-guard-empresa.service';

describe('AuthGuardEmpresaService', () => {
  let service: AuthGuardEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
