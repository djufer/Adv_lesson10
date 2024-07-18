import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAddressesComponent } from './delivery-addresses.component';

describe('DeliveryAddressesComponent', () => {
  let component: DeliveryAddressesComponent;
  let fixture: ComponentFixture<DeliveryAddressesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryAddressesComponent]
    });
    fixture = TestBed.createComponent(DeliveryAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
