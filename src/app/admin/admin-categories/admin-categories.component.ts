import { Component } from '@angular/core';
import { CategoryService } from '../../shared/services/category/category.service';
import { ImageService } from '../../shared/services/image/image.service';
import { CategoryResponse } from '../../shared/interfaces/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent {
  public isOpenForm = false;
  public editedCategoryId!: number;
  public updateStatus = false;
  public currentIconPath!: string;
  public adminCategories: CategoryResponse[] = [];

  public categoryForm!: FormGroup;
  public showNameError = false;
  public showTitleError = false;

  public uploadPercent!: number;
  public isUploaded = false;
  public isUploading = false;

  constructor(
    private categoryService: CategoryService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.initCategoryForm();
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }

  toggleOpenForm(): void {
    this.isOpenForm = !this.isOpenForm;
  }

  getCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.adminCategories = data;
    });
  }

  addCategory(): void {
    // Перевірте, чи форма є валідною
    if (this.categoryForm.invalid) {
      // Якщо форма недійсна, встановіть відповідні флаги для відображення помилок
      this.showNameError = this.categoryForm.controls['name'].invalid;
      this.showTitleError = this.categoryForm.controls['title'].invalid;
      return; // Перервіть відправку форми
    }
    // Якщо форма валідна, відправляйте дані
    if (this.updateStatus) {
      this.categoryService
        .updateCategory(this.categoryForm.value, this.editedCategoryId)
        .subscribe(() => {
          this.getCategories();
          this.toastr.success('Category successfully updated');
          this.updateStatus = false;
        });
    } else {
      this.categoryService
        .createCategory(this.categoryForm.value)
        .subscribe(() => {
          this.getCategories();
          this.toastr.success('Category successfully added');
          // приховую блоки помилок
          this.showNameError = false;
          this.showTitleError = false;
        });
    }
    this.categoryForm.reset();
    this.updateStatus = false;
    this.isUploaded = false;
    this.isOpenForm = false;
    this.uploadPercent = 0;
  }

  removeCategory(category: CategoryResponse): void {
    if (confirm('Are you sure?')) {
      this.categoryService.removeCategory(category.id).subscribe(() => {
        this.getCategories();
        this.toastr.success('Category successfully deleted');
      });
    }
  }

  editCategory(editCategory: CategoryResponse): void {
    this.updateStatus = true; //по цій змінній даективую кнопки "видалити"
    this.isOpenForm = true; //відкриваємо блок з формою
    this.categoryForm.patchValue({
      name: editCategory.name,
      path: editCategory.path,
      imagePath: editCategory.imagePath,
    });
    this.editedCategoryId = editCategory.id;
    this.isUploaded = true;
  }

  upload(event: any): void {
    this.isUploading = true;
    const file = event.target.files[0];
    this.imageService.uploadFile('images/categories', file.name, file)
      .then((data) => {
        this.categoryForm.patchValue({
          imagePath: data,
        });
        this.isUploaded = true;
        this.isUploading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

 
  
  deleteFormImage(): void {
    this.imageService
      .deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.categoryForm.patchValue({
          imagePath: null,
        });
      });
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
}
