import { TestBed } from '@angular/core/testing';

import { CountOrderIDService } from './count-order-id.service';

describe('CountOrderIDService', () => {
  let service: CountOrderIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountOrderIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
