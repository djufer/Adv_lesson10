import { Component, OnDestroy, OnInit } from '@angular/core';
import { Breadcrumb } from '../../shared/interfaces/interfaces';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadcrumbs: Breadcrumb[] = [];
  private breadcrumbSubscription!: Subscription;

  constructor(private breadcrumbService: BreadcrumbService) { }
  ngOnInit(): void {
    this.breadcrumbSubscription = this.breadcrumbService.breadcrumbs$.subscribe((breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
    });
  }

  ngOnDestroy(): void {
    if (this.breadcrumbSubscription) {
      this.breadcrumbSubscription.unsubscribe();
    }
  }
}
