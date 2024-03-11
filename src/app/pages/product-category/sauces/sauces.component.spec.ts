import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaucesComponent } from './sauces.component';

describe('SaucesComponent', () => {
  let component: SaucesComponent;
  let fixture: ComponentFixture<SaucesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaucesComponent]
    });
    fixture = TestBed.createComponent(SaucesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
