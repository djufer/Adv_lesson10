import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss'],
})
export class CarruselComponent {
  public items = [1, 2, 3, 4, 5, 6]; // к-сть слайдів

  public offsetX = 0;
  public isGrabbed = false;

  //  points - масив чисел, які будуть "примангічувати" слайди
  public points: number[] = [];
  // ширина одноого слайду
  public widthOfItem = 49; // ширина одного слайду
  public pxWidthOfItem!: number;

  // змінна, яка додає клас "magnet", який включає анмацію примангічування контейнеру до найближчої точки point з масиву points
  public isMagnetActive = false;

  public selectedIndex = 0; // індекс активного елемента, за замовчуванням 0
  ngOnInit(): void {
    this.getPoints();
  }
  // ф-ція для отримання масиву простого масиву чисел, по якому буде формуватись к-ст індикаторів каруселі. Масив завжди буде мати на один елемент менше чим масив items
  getPoints(): void {
    for (let i = 1; i < this.items.length; i++) {
      this.points.push(i);
    }
  }
  grab(e: MouseEvent): void {
    console.log(e);

    // Отримуємо елемент, на якому відбулося подія
    const targetElement = e.target as HTMLElement;
    // Отримуємо ширину елемента
    this.pxWidthOfItem = targetElement.offsetWidth;
    // якщо у масиві тільки 1-2 елементи - сенсу їх рухати мишкою немає, вони і так два влізають на екран
    if (this.items.length > 2) {
      this.isGrabbed = true;
    }
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
      if (this.items.length === 1) {
        this.offsetX = this.pxWidthOfItem / 2;
      }

      // обмеження з лівого краю
      if (this.offsetX > -this.pxWidthOfItem / 2) {
        this.offsetX = 0;
      }
      for (let i = 1; i < this.points.length; i++) {
        if (
          this.offsetX < -this.pxWidthOfItem * (i - 0.5) &&
          this.offsetX > -this.pxWidthOfItem * (i + 0.5)
        ) {
          this.offsetX = -this.pxWidthOfItem * i;
          this.selectedIndex = i;
        }
      }
      // Обмеження з правого краю
      const maxOffsetX = -((this.items.length - 2) * this.pxWidthOfItem);
      if (this.offsetX < maxOffsetX) {
        this.offsetX = maxOffsetX;
      }
    }

    this.isGrabbed = false;
  }
  // -----------

  setActiveIndex(index: number): void {
    this.selectedIndex = index;
    // ?????
  }
}
