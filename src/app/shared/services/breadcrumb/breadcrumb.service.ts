import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from '../../interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbSubject = new BehaviorSubject<Array<Breadcrumb>>([]);
  public breadcrumbs$ = this.breadcrumbSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        this.breadcrumbSubject.next(breadcrumbs);
      });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
  ): Array<Breadcrumb> {
    const children: ActivatedRoute[] = route.children;
    let breadcrumbs: Array<Breadcrumb> = [];
    if (children.length === 0) {
      return breadcrumbs;
    }
    for (let child of children) {
      const routeURL = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      let breadcrumbLabel = child.snapshot.data['breadcrumb'];

      const routeParams = child.snapshot.params;
      
      if (routeParams && Object.keys(routeParams).length > 0) {
        breadcrumbLabel = `${breadcrumbLabel} / ${
          routeParams['id'] || routeParams['category']
        }`;
      }
      const breadcrumb: Breadcrumb = {
        label: breadcrumbLabel,
        url: `${url}/${routeURL}`,
      };
      breadcrumbs.push(breadcrumb);

      breadcrumbs = breadcrumbs.concat(
        this.createBreadcrumbs(child, breadcrumb.url)
      );
    }
    return breadcrumbs;
  }
}
