import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from '@firebase/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm!: FormGroup;

  public passwordVisible = false;
  public confirmPasswordVisible = false;


  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initChangePasswordForm();
  }
  initChangePasswordForm(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmNewPassword: [null, [Validators.required]]
    });
  }
  async onSubmit(): Promise<void> {
    if (this.changePasswordForm.invalid) {
      return;
    }
    const { currentPassword, newPassword, confirmNewPassword } = this.changePasswordForm.value;
    if (newPassword !== confirmNewPassword) {
      this.toastr.error(`New password and its confirmation do not match` );
      return;
    }
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        // Create credential using email and current password
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        // Reauthenticate with current password
        await reauthenticateWithCredential(user, credential);
        // Update password
        await updatePassword(user, newPassword);
        this.toastr.success('Password updated successfully')
        // Redirect or show success message
        this.router.navigate(['/cabinet']); // Redirect to profile or another page
      } else {
        this.toastr.error('No user found')
      }
    } catch (error) {
      this.toastr.error('Error updating password:');
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  } toggleConfirmePasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }
}
