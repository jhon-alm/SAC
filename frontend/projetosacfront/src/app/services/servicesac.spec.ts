import { TestBed } from '@angular/core/testing';

import { Servicesac } from './servicesac';

describe('Servicesac', () => {
  let service: Servicesac;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servicesac);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
