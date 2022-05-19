import { TestBed } from '@angular/core/testing';

import { PalabrasApiService } from './palabras-api.service';

describe('PalabrasApiService', () => {
  let service: PalabrasApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalabrasApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
