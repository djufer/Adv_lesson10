import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CallBackModalComponent } from './call-back-modal.component';

describe('CallBackModalComponent', () => {
  let component: CallBackModalComponent;
  let fixture: ComponentFixture<CallBackModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CallBackModalComponent ]
    });
    fixture = TestBed.createComponent(CallBackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
