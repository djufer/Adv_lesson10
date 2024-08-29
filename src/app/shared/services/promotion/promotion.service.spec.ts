import { TestBed } from '@angular/core/testing';
import { PromotionService } from './promotion.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PromotionService', () => {
  let service: PromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(PromotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
