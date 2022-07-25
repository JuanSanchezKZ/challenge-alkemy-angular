import { TestBed } from '@angular/core/testing';

import { PricePreparationService } from './price-preparation.service';

describe('PricePreparationService', () => {
  let service: PricePreparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricePreparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
