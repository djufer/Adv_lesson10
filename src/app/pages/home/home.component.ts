import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public currentPosition!: number;
  public isDragging = false;
  public startX = 0;
  public offsetX = 0;
  public isGrabbed = false;

  public items = [1, 2, 3, 4, 5]; // к-сть слайдів
  //  points - масив чисел, які будуть "примангічувати" слайди
  public points: number[] = [];
  // ширина одноого слайду
  public widthOfItem = 49; // ширина одного слайду
  public pxWidthOfItem!: number;

  // змінна, яка додає клас "magnet", який включає анмацію примангічування контейнеру до найближчої точки point з масиву points
  public isMagnetActive = false;
  constructor(private elementRef: ElementRef) {}
  ngOnInit(): void {
    this.createPoints();
  }

  createPoints(): void {
    for (let i = 0; i < this.items.length; i++) {
      this.points.push(i + 0.5);
    }
    console.log(this.points);
  }
  grab(e: MouseEvent): void {
    // Отримуємо елемент, на якому відбулося подія
    const targetElement = e.target as HTMLElement;
    // Отримуємо ширину елемента
    this.pxWidthOfItem = targetElement.offsetWidth;

    this.isGrabbed = true;
  }

  move(e: MouseEvent) {
    if (this.isGrabbed) {
      this.offsetX += e.movementX;
    }
  }
  // 'слухаємо' mouseup в будь якій точці документу
  @HostListener('document:mouseup', ['$event'])
  releaseMouseBtn(): void {
    if (this.isGrabbed) {
      this.isMagnetActive = true;
      console.log(this.offsetX);
      // обмеження з лівого краю
      if (this.offsetX > -this.pxWidthOfItem / 2) {
        this.offsetX = 0;
      }
      // ---------------------------------------------
      for (let i = 0; i < this.points.length; i++) {
        if (
          this.offsetX < -this.pxWidthOfItem * this.points[i] &&
          this.offsetX > -this.pxWidthOfItem * this.points[i + 1]
        ) {
          console.log('2');
          this.offsetX = -this.pxWidthOfItem;
          console.log('Offset  ='+ this.offsetX);
          
          break;
        }
      }

      // if (
      //   this.offsetX < -this.pxWidthOfItem * 0.5 &&
      //   this.offsetX > -this.pxWidthOfItem * 1.5
      // ) {
      //   console.log('2');
      //   this.offsetX = -this.pxWidthOfItem;
      // }
      // if (
      //   this.offsetX < -this.pxWidthOfItem * 1.5 &&
      //   this.offsetX > -this.pxWidthOfItem * 2.5
      // ) {
      //   console.log('3');
      //   this.offsetX = -this.pxWidthOfItem * 2;
      // }
      // if (
      //   this.offsetX < -this.pxWidthOfItem * 2.5 &&
      //   this.offsetX > -this.pxWidthOfItem * 3.5
      // ) {
      //   console.log('4');
      //   this.offsetX = -this.pxWidthOfItem * 3;
      // }
      // if (
      //   this.offsetX < -this.pxWidthOfItem * 3.5 &&
      //   this.offsetX > -this.pxWidthOfItem * 4.5
      // ) {
      //   console.log('5');
      //   this.offsetX = -this.pxWidthOfItem * 4;
      // }
      // if (
      //   this.offsetX < -this.pxWidthOfItem * 3.5 &&
      //   this.offsetX > -this.pxWidthOfItem * 4.5
      // ) {
      //   console.log('5');
      //   this.offsetX = -this.pxWidthOfItem * 4;
      // }
      // --------------------------------------------------

      // Обмеження з правого краю
      const maxOffsetX = -((this.items.length - 2) * this.pxWidthOfItem);
      if (this.offsetX < maxOffsetX) {
        this.offsetX = maxOffsetX;
      }
    }

    this.isGrabbed = false;
  }
}
