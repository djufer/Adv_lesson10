import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProductsComponent } from './admin-products.component';
import { environment } from '../../../environments/environment';
import { ToastrService} from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ProductsService } from  '../../shared/services/product/product.service'
import { firstValueFrom, of } from 'rxjs';
import { CategoryService } from '../../shared/services/category/category.service';
import { ImageService } from '../../shared/services/image/image.service';
import { FormBuilder } from '@angular/forms';
import { ProductResponse } from '../../shared/interfaces/interfaces';
import {DocumentReference, getFirestore, provideFirestore} from '@angular/fire/firestore';

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(  () => {
    productsServiceSpy = jasmine.createSpyObj('ProductsService',
      ['createProductsFirebase', 'getAllFirebase', 'updateProductsFirebase', 'removeProductsFirebase']);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getAll']);
    imageServiceSpy = jasmine.createSpyObj('ImageService', ['uploadFile', 'deleteUploadFile']);
    toastrServiceSpy = jasmine.createSpyObj<ToastrService>('ToastrService', ['success', 'error']);


    productsServiceSpy.getAllFirebase.and.returnValue(of([]));
    productsServiceSpy.createProductsFirebase.and.returnValue(Promise.resolve({} as DocumentReference)); // Змінюємо на Promise
    productsServiceSpy.removeProductsFirebase.and.returnValue(Promise.resolve()); // Виправлено
    categoryServiceSpy.getAllFirebase.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [AdminProductsComponent],
      imports: [
        HttpClientTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage()),
        provideFirestore(() => getFirestore()),
      ],
      providers: [
        FormBuilder,
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: ImageService, useValue: imageServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  xit('should initialize the product form on init', () => {
    spyOn(component, 'initProductForm');
    component.ngOnInit();
    expect(component.initProductForm).toHaveBeenCalled();
  });
  it('should fetch products and categories on init', () => {
    spyOn(component, 'getProducts');
    spyOn(component, 'getCategories');
    component.ngOnInit();
    expect(component.getProducts).toHaveBeenCalled();
    expect(component.getCategories).toHaveBeenCalled();
  });
  it('should add a new product', () => {
    spyOn(component, 'getProducts');
    component.updateStatus = false;
    component.productForm.setValue({
      category: 'testCategory',
      subCategory: null,
      name: 'testProduct',
      path: 'test-path',
      description: 'test description',
      weight: 1,
      price: 100,
      proteins: 10,
      carbohydrates: 20,
      fats: 5,
      calories: 100,
      imagePath: 'test-image-path',
      count: 1
    });
//
    component.addProduct();

    expect(productsServiceSpy.createProductsFirebase).toHaveBeenCalled();
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Product successfully added');
    expect(component.getProducts).toHaveBeenCalled();
  });
  it('should remove a product',  () => {
    spyOn(component, 'getProducts');
    const productMock = {
      category: {
        name: 'string',
        path: 'string',
        imagePath: 'string',
        id: 1
      },
      subCategory: 'string',
      name: 'name',
      path: 'string',
      description: 'string',
      weight: 'string',
      price: 1,
      imagePath: 'string',
      proteins: 1,
      carbohydrates: 1,
      fats: 1,
      calories: 1,
      count: 1,
      id: 'id'
    }

    component.removeProduct(productMock);

    expect(productsServiceSpy.removeProductsFirebase).toHaveBeenCalledWith(productMock.id);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Product successfully deleted')
  });
  it('should upload an image', async () => {
    const file = new File([''], 'test-image.jpg');
    const event = { target: { files: [file] } };
    imageServiceSpy.uploadFile.and.returnValue(Promise.resolve('test-image-url'));

    await component.upload(event);

    expect(imageServiceSpy.uploadFile).toHaveBeenCalled();
    expect(component.productForm.get('imagePath')?.value).toBe('test-image-url');
    expect(component.isUploaded).toBeTrue();
    expect(component.isUploading).toBeFalse();
  });
  it('should delete an image', async () => {
    component.productForm.patchValue({ imagePath: 'test-image-url' });
    imageServiceSpy.deleteUploadFile.and.returnValue(Promise.resolve());

    await component.deleteImage();

    expect(imageServiceSpy.deleteUploadFile).toHaveBeenCalledWith('test-image-url');
    expect(component.productForm.get('imagePath')?.value).toBeNull();
    expect(component.isUploaded).toBeFalse();
    expect(component.uploadPercent).toBe(0);
  });
  it('should handle form validation errors', () => {
    spyOn(window, 'alert');
    component.productForm.setValue({
      category: null,
      subCategory: null,
      name: null,
      path: null,
      description: null,
      weight: null,
      price: null,
      proteins: null,
      carbohydrates: null,
      fats: null,
      calories: null,
      imagePath: null,
      count: 1
    });

    component.addProduct();

    expect(window.alert).toHaveBeenCalledWith('помилка заповнення');
    expect(productsServiceSpy.createProductsFirebase).not.toHaveBeenCalled();
    expect(productsServiceSpy.updateProductsFirebase).not.toHaveBeenCalled();
  });
  it('should correctly populate the form for editing a product', () => {
    const mockProduct: ProductResponse = {
      id: 'id',
      category: {
        id: 'id',
        name: 'Category1',
        path: 'path1',
        imagePath: 'imagePath1'
      },
      subCategory: 'SubCategory1',
      name: 'Product1',
      path: 'path1',
      description: 'Description1',
      weight: '1kg',
      price: 100,
      imagePath: 'imagePath1',
      proteins: 10,
      carbohydrates: 20,
      fats: 5,
      calories: 100,
      count: 10
    };

    component.editProduct(mockProduct);

    // Check if form values are populated correctly
    expect(component.productForm.value).toEqual({
      category: mockProduct.category,
      subCategory: mockProduct.subCategory,
      name: mockProduct.name,
      path: mockProduct.path,
      description: mockProduct.description,
      weight: mockProduct.weight,
      price: mockProduct.price,
      proteins: mockProduct.proteins,
      carbohydrates: mockProduct.carbohydrates,
      fats: mockProduct.fats,
      calories: mockProduct.calories,
      imagePath: mockProduct.imagePath,
      count: mockProduct.count
    });

    // Check if component flags are set correctly
    expect(component.isOpenForm).toBeTrue();
    expect(component.isUploaded).toBeTrue();
    expect(component.updateStatus).toBeTrue();
    expect(component.currentEditProductId).toBe('id');
  });
  it('should delete the image and reset the form imagePath', async () => {
    component.productForm.patchValue({ imagePath: 'test-image-url' });
    imageServiceSpy.deleteUploadFile.and.returnValue(Promise.resolve());

    await component.deleteImage();

    expect(imageServiceSpy.deleteUploadFile).toHaveBeenCalledWith('test-image-url');
    expect(component.productForm.get('imagePath')?.value).toBeNull();
    expect(component.isUploaded).toBeFalse();
    expect(component.uploadPercent).toBe(0);
  });

  it('should reset the form after adding a product', () => {
    spyOn(component.productForm, 'reset');

    component.productForm.setValue({
      category: 'testCategory',
      subCategory: null,
      name: 'testProduct',
      path: 'test-path',
      description: 'test description',
      weight: 1,
      price: 100,
      proteins: 10,
      carbohydrates: 20,
      fats: 5,
      calories: 100,
      imagePath: 'test-image-path',
      count: 1
    });

    component.addProduct();

    expect(component.productForm.reset).toHaveBeenCalled();
    expect(component.isUploaded).toBeFalse();
    expect(component.isOpenForm).toBeFalse();
  });
  it('should update an existing product',  () => {
    spyOn(component, 'getProducts');
    component.updateStatus = true;
    component.currentEditProductId = '';

    component.productForm.setValue({
      category: {
        name: 'name',
        path: 'path',
        imagePath: 'imagePath',
        id: 1
      },
      subCategory: null,
      name: 'testProduct',
      path: 'test-path',
      description: 'test description',
      weight: '1',
      price: 100,
      proteins: 10,
      carbohydrates: 20,
      fats: 5,
      calories: 100,
      imagePath: 'test-image-path',
      count: 1
    });

    component.addProduct();

    expect(productsServiceSpy.updateProductsFirebase).toHaveBeenCalledWith(component.productForm.value, component.currentEditProductId);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Product successfully updated');
    expect(component.getProducts).toHaveBeenCalled();
    expect(component.isUploaded).toBeFalse();
  });
  it('should not add a product if the form is invalid', () => {
    spyOn(window, 'alert');
    component.productForm.setErrors({ invalid: true });
    component.addProduct();

    expect(window.alert).toHaveBeenCalledWith('помилка заповнення');
    expect(productsServiceSpy.createProductsFirebase).not.toHaveBeenCalled();
  });
});
