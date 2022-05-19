import { TestBed } from '@angular/core/testing';

import { ImgPreguntasService } from './img-preguntas.service';

describe('ImgPreguntasService', () => {
  let service: ImgPreguntasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgPreguntasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
