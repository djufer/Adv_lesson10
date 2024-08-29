import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionInfoComponent } from './promotion-info.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PromotionInfoComponent', () => {
  let component: PromotionInfoComponent;
  let fixture: ComponentFixture<PromotionInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionInfoComponent],
      imports: [ RouterTestingModule ]
    });
    fixture = TestBed.createComponent(PromotionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
