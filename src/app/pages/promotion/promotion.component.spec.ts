import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionComponent } from './promotion.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {ToastrService} from "ngx-toastr";

xdescribe('PromotionComponent', () => {
  let component: PromotionComponent;
  let fixture: ComponentFixture<PromotionComponent>;

  beforeEach(() => {
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    TestBed.configureTestingModule({
      declarations: [PromotionComponent],
      imports: [
        HttpClientTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage())
      ],
      providers: [
        { provide: ToastrService, useValue: toastrServiceSpy },
      ]
    });
    fixture = TestBed.createComponent(PromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
