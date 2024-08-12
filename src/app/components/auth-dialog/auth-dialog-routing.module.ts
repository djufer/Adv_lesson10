import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthDialogComponent } from './auth-dialog.component';



const routes: Routes = [
  { path: '', component: AuthDialogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthDialogRoutingModule {}
