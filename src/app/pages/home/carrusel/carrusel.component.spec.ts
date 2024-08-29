import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselComponent } from './carrusel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CarruselComponent', () => {
  let component: CarruselComponent;
  let fixture: ComponentFixture<CarruselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselComponent],
      imports: [ HttpClientTestingModule ]
    });
    fixture = TestBed.createComponent(CarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
