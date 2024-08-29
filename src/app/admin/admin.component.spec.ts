import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Firestore } from '@angular/fire/firestore';
import { Auth} from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule // Імплементація RouterTestingModule для тестування маршрутизаці
      ],
      providers: [
        {provide: Firestore, useValue: {}},
        {provide: Auth, useValue: {}},
        {provide: ToastrService, useValue: {}},
      ]
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
