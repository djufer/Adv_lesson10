import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalDataRoutingModule } from './personal-data-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { PersonalDataComponent } from './personal-data.component';

@NgModule({
  declarations: [ PersonalDataComponent ],
  imports: [
    CommonModule,
    PersonalDataRoutingModule,
    SharedModule
  ]
})
export class PersonalDataModule { }
