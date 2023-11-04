import { TestBed } from '@angular/core/testing';

import { FraseService } from './frase.service';

describe('FraseService', () => {
  let service: FraseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FraseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
