import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCategoriesComponent } from './admin-categories.component';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { CategoryService } from '../../shared/services/category/category.service';
import { CategoryResponse } from '../../shared/interfaces/interfaces';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';

describe('AdminCategoriesComponent', () => {
  let component: AdminCategoriesComponent;
  let fixture: ComponentFixture<AdminCategoriesComponent>;
  let categoryService: CategoryService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [AdminCategoriesComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage())
      ],
      providers: [
        CategoryService,
        { provide: ToastrService, useValue: toastrServiceSpy }, // Використовуємо шпіона тут
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AdminCategoriesComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getCategories and initCategoryForm on ngOnInit', ()=>{
    spyOn(component, 'getCategories').and.callThrough();
    spyOn(component, 'initCategoryForm').and.callThrough();
    component.ngOnInit();
    expect(component.getCategories).toHaveBeenCalled();
    expect(component.initCategoryForm).toHaveBeenCalled();
  });

  it('should initialize categoryForm with three controls', () => {
    component.initCategoryForm();
    expect(component.categoryForm).toBeTruthy();
    expect(component.categoryForm.contains('name')).toBeTrue();
    expect(component.categoryForm.contains('path')).toBeTrue();
    expect(component.categoryForm.contains('imagePath')).toBeTrue();
    expect(component.categoryForm.get('name')?.validator).toBeTruthy();
    expect(component.categoryForm.get('path')?.validator).toBeTruthy();
    expect(component.categoryForm.get('imagePath')?.validator).toBeTruthy();
  });


  it('should toggle isOpenForm between true and false', () => {
    expect(component.isOpenForm).toBeFalse();
    component.toggleOpenForm();
    expect(component.isOpenForm).toBeTrue();
    component.toggleOpenForm();
    expect(component.isOpenForm).toBeFalse();
  });
  it('should get categories', ()=>{
    let mockCategories: CategoryResponse[] = [
        { id: 1, name: 'name', path: 'path', imagePath: 'imagePath' },
        { id: 2, name: 'name2', path: 'path2', imagePath: 'imagePath2' }
      ];
    spyOn(categoryService, 'getAll').and.returnValue(of(mockCategories));
    component.getCategories();
    expect(categoryService.getAll).toHaveBeenCalled();
    expect(component.adminCategories).toEqual(mockCategories);
  })

  it('should return empty array if data is empty', ()=>{
    let mockCategories: CategoryResponse[] = [];
    spyOn(categoryService, 'getAll').and.returnValue(of(mockCategories));
    component.getCategories();
    expect(component.adminCategories).toEqual([])
  });

  it('should not proceed if the form is invalid', () => {
    component.initCategoryForm();
    component.categoryForm.controls['name'].setValue('');
    component.categoryForm.controls['path'].setValue('');
    component.categoryForm.markAsDirty();
    component.categoryForm.updateValueAndValidity();
    const createSpy = spyOn(component['categoryService'], 'createCategory');
    const updateSpy = spyOn(component['categoryService'], 'updateCategory');
    component.addCategory();
    expect(createSpy).not.toHaveBeenCalled();
    expect(updateSpy).not.toHaveBeenCalled();
    expect(toastrService.success).not.toHaveBeenCalled();
    expect(component.showNameError).toBeTrue();
    expect(component.showTitleError).toBeTrue();
  });

  it('should call createCategory and toastr.success when form is valid and updateStatus is false', () => {
    component.initCategoryForm();
    component.categoryForm.controls['name'].setValue('New Category');
    component.categoryForm.controls['path'].setValue('new-category-path');
    component.categoryForm.controls['imagePath'].setValue('image-path');
    const mockResponse: CategoryResponse = {
      id: 1,
      path: 'new-category-path',
      name: 'New Category',
      imagePath: 'image-path'
    };
    const createSpy = spyOn(categoryService, 'createCategory').and.returnValue(of(mockResponse));
    const resetSpy = spyOn(component.categoryForm, 'reset');
    component.addCategory();
    expect(createSpy).toHaveBeenCalledWith({
      name: 'New Category',
      path: 'new-category-path',
      imagePath: 'image-path'
    });
    expect(toastrService.success).toHaveBeenCalledWith('Category successfully added');
    expect(resetSpy).toHaveBeenCalled();
    expect(component.updateStatus).toBeFalse();
    expect(component.isUploaded).toBeFalse();
    expect(component.isOpenForm).toBeFalse();
    expect(component.uploadPercent).toBe(0);
  });

  it('should call updateCategory and toastr.success when form is valid and updateStatus is true', () => {
    component.initCategoryForm();
    component.categoryForm.controls['name'].setValue('Updated Category');
    component.categoryForm.controls['path'].setValue('updated-category-path');
    component.categoryForm.controls['imagePath'].setValue('updated-image-path');
    component.updateStatus = true;
    const mockResponse: CategoryResponse = {
      id: 1,
      name: 'Updated Category',
      path: 'updated-category-path',
      imagePath: 'updated-image-path'
    };
    const updateSpy = spyOn(categoryService, 'updateCategory').and.returnValue(of(mockResponse));
    const resetSpy = spyOn(component.categoryForm, 'reset');
    component.addCategory();
    expect(updateSpy).toHaveBeenCalledWith({
      name: 'Updated Category',
      path: 'updated-category-path',
      imagePath: 'updated-image-path'
    }, component.editedCategoryId);
    expect(toastrService.success).toHaveBeenCalledWith('Category successfully updated');
    expect(resetSpy).toHaveBeenCalled();
    expect(component.updateStatus).toBeFalse();
    expect(component.isUploaded).toBeFalse();
    expect(component.isOpenForm).toBeFalse();
    expect(component.uploadPercent).toBe(0);
  });

  it('should call removeCategory, getCategories, and show success toastr when confirmed', () => {
    component.initCategoryForm();
    const mockCategory: CategoryResponse = {
      id: 1, name: 'Test Category', path: 'test-category', imagePath: 'path/to/image'
    };
    spyOn(window, 'confirm').and.returnValue(true);
    const removeSpy = spyOn(categoryService, 'removeCategory').and.returnValue(of(undefined));
    const getCategoriesSpy = spyOn(component, 'getCategories');
    component.removeCategory(mockCategory);
    expect(window.confirm).toHaveBeenCalledWith('Are you sure?');
    expect(removeSpy).toHaveBeenCalledWith(1);
    expect(getCategoriesSpy).toHaveBeenCalled();
    expect(toastrService.success).toHaveBeenCalledWith('Category successfully deleted');
  });

  it('should not call removeCategory if confirmation is canceled', () => {
    component.initCategoryForm();
    const mockCategory: CategoryResponse = { id: 1, name: 'Test Category', path: 'test-category', imagePath: 'path/to/image' };
    spyOn(window, 'confirm').and.returnValue(false);
    const removeSpy = spyOn(categoryService, 'removeCategory');
    component.removeCategory(mockCategory);
    expect(removeSpy).not.toHaveBeenCalled();
    expect(toastrService.success).not.toHaveBeenCalled();
  });

  it('should update form and flags correctly when editCategory is called', () => {
    const mockCategory: CategoryResponse = {
      id: 1,
      name: 'Edited Category',
      path: 'edited-category',
      imagePath: 'path/to/image'
    };
    component.editCategory(mockCategory);
    expect(component.updateStatus).toBeTrue();
    expect(component.isOpenForm).toBeTrue();
    expect(component.categoryForm.value).toEqual({
      name: mockCategory.name,
      path: mockCategory.path,
      imagePath: mockCategory.imagePath
    });
    expect(component.editedCategoryId).toEqual(mockCategory.id);
    expect(component.isUploaded).toBeTrue();
  });



  it('should upload a file and update the form correctly', fakeAsync(() => {
    // Створюємо мок події з файлом
    const mockEvent = {
      target: {
        files: [new File([''], 'test-image.png', { type: 'image/png' })]
      }
    };

    // Створюємо мокований сервіс з потрібними методами
    const uploadSpy = spyOn(component['imageService'], 'uploadFile').and.returnValue(Promise.resolve('path/to/uploaded/image.png'));
    const patchValueSpy = spyOn(component.categoryForm, 'patchValue');

    // Викликаємо метод upload
    component.upload(mockEvent);

    // Імітуємо завершення асинхронних операцій
    tick();
    flushMicrotasks();

    // Перевірка, що isUploading встановлено на true
    expect(component.isUploading).toBeFalse();

    // Перевірка, що uploadFile викликається з правильними аргументами
    expect(uploadSpy).toHaveBeenCalledWith('images/categories', 'test-image.png', mockEvent.target.files[0]);

    // Перевірка, що форма оновлюється правильним значенням
    expect(patchValueSpy).toHaveBeenCalledWith({ imagePath: 'path/to/uploaded/image.png' });

    // Перевірка, що isUploaded встановлюється на true
    expect(component.isUploaded).toBeTrue();
  }));

  it('should handle upload error', fakeAsync(() => {
    // Створюємо мок події з файлом
    const mockEvent = {
      target: {
        files: [new File([''], 'test-image.png', { type: 'image/png' })]
      }
    };

    // Створюємо шпигун для методу console.log для перевірки наявності помилки
    const consoleSpy = spyOn(console, 'log');

    // Мокаємо `uploadFile` з відхиленням промісу для симуляції помилки
    spyOn(component['imageService'], 'uploadFile').and.returnValue(Promise.reject('Upload failed'));

    // Викликаємо метод upload
    component.upload(mockEvent);

    // Імітуємо завершення асинхронних операцій
    tick();
    flushMicrotasks();

    // Перевірка, що відображається помилка
    expect(consoleSpy).toHaveBeenCalledWith('Upload failed');
  }));

  it('should delete the uploaded file and reset form correctly', fakeAsync(() => {
    // Налаштовуємо значення для методу valueByControl
    const imagePath = 'path/to/uploaded/image.png';
    spyOn(component, 'valueByControl').and.returnValue(imagePath);

    // Мокаємо `deleteUploadFile` на повернення обіцянки (promise)
    const deleteSpy = spyOn(component['imageService'], 'deleteUploadFile').and.returnValue(Promise.resolve());

    // Шпигун для перевірки методу `patchValue`
    const patchValueSpy = spyOn(component.categoryForm, 'patchValue');

    // Викликаємо метод `deleteFormImage`
    component.deleteFormImage();

    // Імітуємо завершення асинхронних операцій
    tick();

    // Перевіряємо, що `deleteUploadFile` викликається з правильним аргументом
    expect(deleteSpy).toHaveBeenCalledWith(imagePath);

    // Перевіряємо, що `isUploaded` встановлюється на `false`
    expect(component.isUploaded).toBeFalse();

    // Перевіряємо, що `uploadPercent` встановлюється на `0`
    expect(component.uploadPercent).toBe(0);

    // Перевіряємо, що `patchValue` викликається з об'єктом, що очищує `imagePath`
    expect(patchValueSpy).toHaveBeenCalledWith({ imagePath: null });
  }));

  it('should return the value of the specified form control', () => {
    // Ініціалізуємо форму
    component.initCategoryForm();

    // Встановлюємо значення для контролю 'name'
    component.categoryForm.controls['name'].setValue('Test Category');

    // Викликаємо метод valueByControl та перевіряємо, що він повертає правильне значення
    const result = component.valueByControl('name');
    expect(result).toBe('Test Category');

    // Встановлюємо значення для контролю 'path'
    component.categoryForm.controls['path'].setValue('test-category-path');

    // Викликаємо метод valueByControl для 'path' та перевіряємо правильне значення
    const resultPath = component.valueByControl('path');
    expect(resultPath).toBe('test-category-path');
  });


});

// Statements   : 39.47% ( 347/879 )
// Branches     : 15.89% ( 24/151 )
// Functions    : 38.51% ( 104/270 )
// Lines        : 39.19% ( 339/865 )



