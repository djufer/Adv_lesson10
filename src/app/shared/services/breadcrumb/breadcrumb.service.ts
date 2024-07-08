import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  public myBreadcrumbs: Array<Breadcrumb> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.myBreadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      });
  }
  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<Breadcrumb> = []
  ): Array<Breadcrumb> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      console.log(children.length);
      return breadcrumbs;
      
    }

    for (const child of children) {
      const routeURL = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      const breadcrumbLabel = child.snapshot.data['breadcrumb'];

      const breadcrumb: Breadcrumb = {
        label: breadcrumbLabel,
        url: `${url}/${routeURL}`,
      };
      breadcrumbs.push(breadcrumb);

      this.createBreadcrumbs(child, breadcrumb.url, breadcrumbs);
    }
    return breadcrumbs;
  }
}
