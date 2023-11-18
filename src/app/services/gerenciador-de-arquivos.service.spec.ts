import { TestBed } from '@angular/core/testing';

import { GerenciadorDeArquivosService } from './gerenciador-de-arquivos.service';

describe('GerenciadorDeArquivosService', () => {
  let service: GerenciadorDeArquivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciadorDeArquivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
