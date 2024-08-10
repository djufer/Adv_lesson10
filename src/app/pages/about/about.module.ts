import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AboutComponent } from './about.component';
import { CarrouselAboutComponent } from './carrousel-about/carrousel-about.component';
import { AboutRoutingModule } from './about-routing.module';


@NgModule({
  declarations: [
    AboutComponent,
    CarrouselAboutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
