import { TestBed } from '@angular/core/testing';

import { FormFiltrosService } from './form-filtros.service';

describe('FormFiltrosService', () => {
  let service: FormFiltrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormFiltrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
