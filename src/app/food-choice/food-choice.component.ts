import { Component, OnInit } from '@angular/core';
import { Food } from '../models/food.model';
import { FoodsService } from '../services/foods.service';

@Component({
  selector: 'cmdr-food-choice',
  templateUrl: './food-choice.component.html',
  styleUrls: ['./food-choice.component.scss']
})
export class FoodChoiceComponent implements OnInit {

  foods: Food[];
  constructor(private foodService: FoodsService) { }

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    this.foodService.getFoods().subscribe(foods => {
      this.foods = foods;
    });
  }

  foodSelection(foodId: string) {
    console.log('selection', foodId);
  }

}
