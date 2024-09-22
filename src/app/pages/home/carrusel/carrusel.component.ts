import { Component, HostListener, ElementRef } from '@angular/core';
import { PromotionResponse } from 'src/app/shared/interfaces/interfaces';
import { PromotionService } from 'src/app/shared/services/promotion/promotion.service';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss'],
})
export class CarruselComponent {
  // кружечки керування каруселлю
  public indicators: number[] = [];
  public isGrabbed = false;
  //  points - масив чисел, які будуть "примангічувати" слайди
  public points: number[] = [];
  public offsetX = 0; // відступ
  public widthOfCarouselPx!: number; // ширина одного слайду

  public pxWidthOfItem!: number;

  // змінна, яка додає клас "magnet", який включає анмацію примангічування контейнеру до найближчої точки point з масиву points
  public isMagnetActive = false;
  public mouseMoveX = 0; // перетягування мишкою праворуч-ліворуч
  public selectedIndex = 0; // індекс активного елемента, за замовчуванням 0

  constructor(
    private elementRef: ElementRef,
    private promotionService: PromotionService
  ) {}

  // дані з сервісу
  public carouselPromotions: PromotionResponse[] = [];

  ngOnInit(): void {
    this.getPromotions();
  }

  getPromotions(): void {
    this.promotionService.getAllFirebase().subscribe((data) => {
      this.carouselPromotions = data as PromotionResponse[];
      this.getWidthOfCarousel();
      this.getPoints();
      this.getIndicators();
      this.reloadOffset();
    });
  }

  getWidthOfCarousel(): void {
    const elem = this.elementRef.nativeElement.querySelector('.carousel');
    if (elem) {
      this.widthOfCarouselPx = elem.offsetWidth;
    }
  }
  // отримання масиву
  getPoints(): void {
    this.points = [];
    for (
      let i = 1, j = 0;
      i < this.carouselPromotions.length;
      i++, j = j + this.widthOfCarouselPx / 2
    ) {
      this.points.push(-j);
    }
  }

  getIndicators(): void {
    this.indicators = [];
    for (let i = 1; i < this.carouselPromotions.length; i++) {
      this.indicators.push(i);
    }
  }

  // ф-ція для отримання масиву простого масиву чисел, по якому буде формуватись к-ст індикаторів каруселі. Масив завжди буде мати на один елемент менше чим масив items
  grab(): void {
    if (this.carouselPromotions.length > 2) {
      this.isGrabbed = true;
      this.isMagnetActive = false;
      this.mouseMoveX = 0;
    }
  }

  move(event: MouseEvent) {
    if (this.isGrabbed) {
      this.offsetX = this.offsetX + event.movementX;
      this.mouseMoveX += event.movementX;
    }
  }
  mouseUp(): void {
    this.isMagnetActive = true;
    this.magnetTrack();
  }
  magnetTrack() {
    if (this.mouseMoveX < -this.widthOfCarouselPx / 12) {
      this.selectedIndex++;
      if (this.selectedIndex > this.points.length - 1) {
        this.selectedIndex = this.points.length - 1;
      }
    }
    if (this.mouseMoveX > this.widthOfCarouselPx / 12) {
      this.selectedIndex--;
      if (this.selectedIndex < 0) {
        this.selectedIndex = 0;
      }
    }
    if (this.mouseMoveX < (-this.widthOfCarouselPx / 2) * 1.5) {
      this.selectedIndex++;
      if (this.selectedIndex > this.points.length - 1) {
        this.selectedIndex = this.points.length - 1;
      }
    }
    if (this.mouseMoveX > (this.widthOfCarouselPx / 2) * 1.5) {
      this.selectedIndex--;
      if (this.selectedIndex < 0) {
        this.selectedIndex = 0;
      }
    }
    this.mouseMoveX = 0;
    this.setActiveIndex(this.selectedIndex);
  }

  // 'слухаємо' mouseup в будь якій точці документу
  @HostListener('document:mouseup', ['$event'])
  releaseMouseBtn(): void {
    if (this.isGrabbed) {
      this.isMagnetActive = true;
      this.magnetTrack();
      this.offsetX = this.points[this.selectedIndex];
      this.isGrabbed = false;
    }
  }
  // -----------

  setActiveIndex(ind: number): void {
    this.isMagnetActive = true;
    this.offsetX = this.points[ind];
    this.selectedIndex = ind;
  }
  reloadOffset() {
    this.offsetX = this.points[this.selectedIndex];
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    // Оновлюємо ваш компонент при ресайзі вікна
    this.getWidthOfCarousel();
    this.getPoints();
    this.getIndicators();
    this.reloadOffset();
  }
}
