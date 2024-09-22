import { Component } from '@angular/core';
import { PromotionService } from '../../shared/services/promotion/promotion.service';
import {
  PromotionRequest,
  PromotionResponse,
} from '../../shared/interfaces/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  percentage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Timestamp } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-admin-promotion',
  templateUrl: './admin-promotion.component.html',
  styleUrls: ['./admin-promotion.component.scss'],
})
export class AdminPromotionComponent {
  //
  public editStatus = false; // відкривання/закривання блоку з формою
  public updateStatus = false; // статус оновлення

  public adminPromotions: PromotionResponse[] = [];
  public currentEditingPromotionId!: number | string;
  // змінні для показу&приховування помилок
  public showNameError = false;
  public showTitleError = false;
  public showDescriptionError = false;
  public showFileError = false;

  public promotionForm!: FormGroup;

  public uploadPercent!: number;
  public isUploaded = false;
  public isUploading = false;


  constructor(
    private promotionService: PromotionService,
    private fb: FormBuilder,
    private storage: Storage,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initPromotionForm();
    this.getPromotions();
  }

  initPromotionForm(): void {
    this.promotionForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }

  getPromotions(): void {
    this.promotionService.getAllFirebase().subscribe((data) => {
      this.adminPromotions = data.map(promotion => {
        // Переконайтесь, що всі властивості присутні
        const date = promotion['date'] instanceof Timestamp ? promotion['date'].toDate() : promotion['date'];
        return {
          id: promotion.id || '', // Переконайтесь, що `id` не пустий
          name: promotion['name'] || '', // Переконайтесь, що `name` не пустий
          title: promotion['title'] || '', // Переконайтесь, що `title` не пустий
          description: promotion['description'] || '', // Переконайтесь, що `description` не пустий
          imagePath: promotion['imagePath'] || '', // Переконайтесь, що `imagePath` не пустий
          date: date instanceof Date ? date : new Date() // Встановлює нову дату, якщо `date` не є дійсним об'єктом Date
        } as PromotionResponse; // Явне перетворення типу
      });
    });
  }
  // показ і приховування блоку з додавання і редагування даних
  toggleStatus(): void {
    this.editStatus = !this.editStatus;
  }
  addPromotion(): void {
    if (this.promotionForm.invalid) {
      this.showNameError = this.promotionForm.controls['name'].invalid;
      this.showTitleError = this.promotionForm.controls['title'].invalid;
      this.showDescriptionError =
        this.promotionForm.controls['description'].invalid;
      this.showFileError = this.promotionForm.controls['imagePath'].invalid;
      return;
    } else if (this.updateStatus) {
      this.promotionService
        .updatePromotionFirebase(
          this.promotionForm.value,
          this.currentEditingPromotionId as string
        )
        .then(() => {
          this.getPromotions();
          this.updateStatus = false;
          this.isUploaded = false;
          this.uploadPercent = 0;
          // this.promotionForm.reset();
        });
    } else {
      //    ДОДАВАННЯ
      const newPromotion: PromotionRequest = {
        ...this.promotionForm.value,
        date: new Date(), // Додаємо поточну дату до об'єкту нової акції
      };
      // додавання нового promotion на сервер
      this.promotionService.createPromotionFirebase(newPromotion).then(() => {
        // оновлення всього масиву promotions
        this.getPromotions();
        this.isUploaded = false;

        // ховаю всі блоки помилки
        this.showNameError = false;
        this.showTitleError = false;
        this.showDescriptionError = false;
        this.showFileError = false;
        this.promotionForm.reset();
      });
    }

    this.editStatus = false;
    this.uploadPercent = 0;
  }

  removePromotion(promotion: PromotionResponse): void {
    const imagePath = promotion.imagePath;
    if (imagePath) {
      const imageRef = ref(this.storage, imagePath);
      deleteObject(imageRef).then(() => {
      })
    }
    this.promotionService.removePromotionFirebase(promotion.id as string).then(() => {
      this.getPromotions();
      this.toastr.success('Promotion succefully deleted')
    });
  }
  editPromotion(promotion: PromotionResponse): void {
    // заносимо дані у форму

    this.promotionForm.patchValue({
      name: promotion.name,
      title: promotion.title,
      description: promotion.description,
      imagePath: promotion.imagePath, // ...дату не вказую...
    });

    this.editStatus = true;
    this.currentEditingPromotionId = promotion.id as string;
    this.updateStatus = true;
  }

  upload(event: any): void {
    this.isUploading = true;
    const file = event.target.files[0];
    this.uploadFile('images/promotions', file.name, file)
      .then((data) => {
        this.promotionForm.patchValue({
          imagePath: data,
        });
        this.isUploaded = true;
        this.isUploading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async uploadFile(
    folder: string,
    name: string,
    file: File | null
  ): Promise<string> {

    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe((data) => {
          this.uploadPercent = data.progress;
        });
        await task;

        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  valueByControl(control: string): string{
    return this.promotionForm.get(control)?.value;
  }
    //  видалення з фаєрбейсу картинки яка відображається на даний момент у формі
  deleteImage(): void{
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('file deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.promotionForm.patchValue({
        imagePath: null
      })

    })
  }
}
