import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPromotionComponent } from './admin-promotion.component';
import { PromotionService } from '../../shared/services/promotion/promotion.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Storage } from '@angular/fire/storage';
import { PromotionResponse } from '../../shared/interfaces/interfaces';

describe('AdminPromotionComponent', () => {
  let component: AdminPromotionComponent;
  let fixture: ComponentFixture<AdminPromotionComponent>;
  let promotionServiceMock: jasmine.SpyObj<PromotionService>;

  beforeEach(async () => {
    const promotionServiceSpy = jasmine.createSpyObj('PromotionService', ['getAll', 'addNewPromotion', 'updatePromotion', 'removePromotion']);
    const storageSpy = jasmine.createSpyObj('Storage', ['ref']);
    const refSpy = jasmine.createSpyObj('Reference', ['delete']);
    storageSpy.ref.and.returnValue(refSpy);


    promotionServiceSpy.getAll.and.returnValue(of({}))
    promotionServiceSpy.addNewPromotion.and.returnValue(of());
    promotionServiceSpy.removePromotion.and.returnValue(of(void 0));
    promotionServiceSpy.updatePromotion.and.returnValue(of(void 0));


    await TestBed.configureTestingModule({
      declarations: [AdminPromotionComponent],
      providers: [
        FormBuilder,
        { provide: PromotionService, useValue: promotionServiceSpy },
        { provide: Storage, useValue: storageSpy },
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPromotionComponent);
    component = fixture.componentInstance;
    promotionServiceMock = TestBed.inject(PromotionService) as jasmine.SpyObj<PromotionService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.promotionForm).toBeDefined();
    expect(promotionServiceMock.getAll).toHaveBeenCalled();
  });

  it('should toggle editStatus when toggleStatus is called', () => {
    component.editStatus = false;
    component.toggleStatus();
    expect(component.editStatus).toBeTrue();

    component.toggleStatus();
    expect(component.editStatus).toBeFalse();
  });

  it('should show validation errors when addPromotion is called with invalid form', () => {
    component.initPromotionForm();
    component.promotionForm.patchValue({
      name: null,
      title: null,
      description: null,
      imagePath: null,
    });
    component.addPromotion();

    expect(component.showNameError).toBeTrue();
    expect(component.showTitleError).toBeTrue();
    expect(component.showDescriptionError).toBeTrue();
    expect(component.showFileError).toBeTrue();
  });

  it('should add a new promotion when addPromotion is called with valid form', () => {
    component.initPromotionForm();
    component.promotionForm.patchValue({
      name: 'Promotion Name',
      title: 'Promotion Title',
      description: 'Description',
      imagePath: 'path/to/image',
    });
    component.addPromotion();
    expect(promotionServiceMock.addNewPromotion).toHaveBeenCalled();
    expect(component.promotionForm.reset).toBeTruthy();
    expect(component.editStatus).toBeFalse();
  });

  it('should patch form with promotion data when editPromotion is called', () => {
    component.initPromotionForm();
    const promotion = {
      id: 1,
      name: 'Test Promotion',
      title: 'Test Title',
      description: 'Test Description',
      imagePath: 'path/to/image',
      date: new Date(),
    };

    component.editPromotion(promotion);
    expect(component.promotionForm.value).toEqual({
      name: 'Test Promotion',
      title: 'Test Title',
      description: 'Test Description',
      imagePath: 'path/to/image',
    });
    expect(component.editStatus).toBeTrue();
    expect(component.updateStatus).toBeTrue();
  });
});
