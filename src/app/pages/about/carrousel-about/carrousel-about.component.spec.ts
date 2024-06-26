import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselAboutComponent } from './carrousel-about.component';

describe('CarrouselAboutComponent', () => {
  let component: CarrouselAboutComponent;
  let fixture: ComponentFixture<CarrouselAboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarrouselAboutComponent]
    });
    fixture = TestBed.createComponent(CarrouselAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
