import { Component } from '@angular/core';
import { PromotionService } from '../../../shared/services/promotion/promotion.service';
import { ActivatedRoute } from '@angular/router';
import { PromotionResponse } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-promotion-info',
  templateUrl: './promotion-info.component.html',
  styleUrls: ['./promotion-info.component.scss'],
})
export class PromotionInfoComponent {

  public currentPromotion!: PromotionResponse;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.currentPromotion = this.activatedRoute.snapshot.data['promotionInfo'];
   }
}

