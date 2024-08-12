import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AuthDialogRoutingModule } from './auth-dialog-routing.module';
import { AuthDialogComponent } from './auth-dialog.component';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";

@NgModule({
  declarations: [ AuthDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthDialogRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ]
})
export class AuthDialogModule { }
