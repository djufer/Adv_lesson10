import { TestBed } from '@angular/core/testing';

import { CountOrderIDService } from './count-order-id.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {Firestore} from "@angular/fire/firestore";

describe('CountOrderIDService', () => {
  let service: CountOrderIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: Firestore, useValue: {}}
      ]
    });
    service = TestBed.inject(CountOrderIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
