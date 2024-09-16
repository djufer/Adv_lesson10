import { Component } from '@angular/core';
import { CategoryResponse, ProductResponse } from './../../shared/interfaces/interfaces';
import { ProductsService } from '../../shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as test from "node:test";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent {
  public isOpenForm = false;

  public updateStatus = false;
  public currentEditProductId = 0;
  public adminCategories: CategoryResponse[] = [];
  public adminProducts: ProductResponse[] = [];

  public productForm!: FormGroup;

  public isUploaded = false;
  public uploadPercent!: number;
  public isUploading = false; // поки що тру

  constructor(
    public  productsService: ProductsService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private imageService: ImageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.initProductForm();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      subCategory: [null],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      proteins: [null, Validators.required],
      carbohydrates: [null, Validators.required],
      fats: [null, Validators.required],
      calories: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: 1
    });
  }

  getProducts(): void {
    this.productsService.getAll().subscribe((data) => {
      this.adminProducts = data;
      this.productForm.patchValue({
        category: this.adminCategories[0],
      });
    });
  }
  getCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.adminCategories = data;
    });
  }

  addProduct(): void {
    if (this.productForm.invalid) {
      alert('помилка заповнення');
      return;
    }
    if (this.updateStatus) {
      this.productsService
        .updateProduct(this.productForm.value, this.currentEditProductId)
        .subscribe(() => {
          this.toastr.success('Product successfully updated');
          this.getProducts();
          this.updateStatus = false;
        });
    } else {
      this.productsService
        .addNewProduct(this.productForm.value)
        .subscribe(() => {
          this.getProducts();
          this.toastr.success('Product successfully added');
          this.productForm.reset();
        });
    }
    this.productForm.patchValue({
      measurementType: 'weight',
    });
    this.isOpenForm = false;
    this.isUploaded = false;
  }

  removeProduct(product: ProductResponse): void {
    this.productsService.removeProduct(product.id).subscribe(() => {
      this.getProducts();
      this.toastr.success('Product successfully deleted');
    });
  }

  editProduct(product: ProductResponse): void {
    this.productForm.reset();
    this.productForm.patchValue(product);
    this.isOpenForm = true;
    this.isUploaded = true;
    this.updateStatus = true;
    this.currentEditProductId = product.id;
  }

  // ----------------------------

  upload(event: any): void {
    this.isUploading = true;
    const file = event.target.files[0];
    this.imageService
      .uploadFile('images/products', file.name, file)
      .then((data) => {
        this.productForm.patchValue({
          imagePath: data,
        });
        this.isUploaded = true;
        this.isUploading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // метод для видалення картинки, шлях до якої береться з заповненої в даниймомент форми ;
  deleteImage(): void {
    this.imageService
      .deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });

  }
  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }
}
