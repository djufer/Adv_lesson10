import { Component } from '@angular/core';
import { UserProfile } from '../../../shared/interfaces/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent {
  public isEditing = false;
  public currentUser!: UserProfile;
  public persDataForm!: FormGroup;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.getCurrentUser();
    this.setFormData();
  }

  getCurrentUser(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
      if (this.currentUser && this.currentUser.personalData) {
        this.setFormData();
      } else {
        console.error('personalData is missing');
      }
    } else {
      console.error('currentUser is missing in localStorage');
    }
  }
  setFormData(): void {
    if (this.persDataForm && this.currentUser && this.currentUser.personalData) {
      this.persDataForm.patchValue({
        firstName: this.currentUser.personalData.firstName,
        lastName: this.currentUser.personalData.lastName,
        phoneNumber: this.currentUser.personalData.phoneNumber,
        email: this.currentUser.personalData.email,
      });
    } else {
      console.error('Form is not initialized or personalData is missing');
    }
  }
  changeIsEditingStatus(): void {
    this.isEditing = !this.isEditing;
  }

  initForm(): void {
    this.persDataForm = this.fb.group({
      firstName: [null],
      lastName: [null],
      phoneNumber: [null],
      email: [null],
    });
  }

  onSubmit(): void {
    if (this.persDataForm.valid) {
      this.updatePersonalUserData();
      this.changeIsEditingStatus();
    } else {
      console.log('Form is not valid');
    }
  }
  updatePersonalUserData(): void {
    const personel = this.persDataForm.value;
    personel.role = 'USER';
    this.accountService
      .updatePersonalData(personel)
      .then(() => {
        this.getCurrentUser();
      })
      .catch((e) => {
        this.toastr.error('Сталася помилка під час оновлення даних');
      });
  }
}
