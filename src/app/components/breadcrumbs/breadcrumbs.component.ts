import { Component } from '@angular/core';
import { Breadcrumb } from '../../shared/interfaces/interfaces';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {}
  ngOnInit(): void {
     this.breadcrumbService.breadcrumbs$.subscribe((breadcrumbs) => {
       this.breadcrumbs = breadcrumbs;
     });
    
  }
}
