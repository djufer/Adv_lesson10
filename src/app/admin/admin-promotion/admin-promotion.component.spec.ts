import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromotionComponent } from './admin-promotion.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage'

describe('AdminPromotionComponent', () => {
  let component: AdminPromotionComponent;
  let fixture: ComponentFixture<AdminPromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPromotionComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(AdminPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
