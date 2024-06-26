import { Component } from '@angular/core';
import { PromotionService } from '../../shared/services/promotion/promotion.service';
import { PromotionResponse } from '../../shared/interfaces/interfaces';
  


@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
})
export class PromotionComponent {
  public userPromotions: PromotionResponse[] = [];
  constructor(private promotionService: PromotionService) {}

  ngOnInit(): void {
    this.getPromotions();
  }

  getPromotions(): void {
    this.promotionService.getAll().subscribe((data) => {  
      this.userPromotions = data;
    });
  }
  

}
