import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  public titles = document.getElementsByClassName('accordion-title');
  openAccordInner(e: MouseEvent) {
    console.log(e.target);
    for (let index = 0; index < this.titles.length; index++) {
      if (e.target === this.titles[index]) {
        this.titles[index].nextElementSibling?.classList.toggle('show');
      }
    }
  }
}
