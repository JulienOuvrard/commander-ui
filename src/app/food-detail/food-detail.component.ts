import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Food } from '../models/food.model';

@Component({
  selector: 'cmdr-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent implements OnInit {

  @Input() hidden: boolean;
  @Input() food: Food;
  @Input() categories: string[];
  @Output() foodChange: EventEmitter<Food>;

  constructor() {
    this.hidden = true;
    this.foodChange = new EventEmitter<Food>();
  }

  ngOnInit() {
  }

  saveFood() {
    this.foodChange.emit(this.food);
  }

  cancel() {
    this.hidden = true;
    this.food = null;
    this.foodChange.emit(null);
  }

  addIngredient(ingredient: string) {
    if (!this.food.ingredients) {
      this.food.ingredients = [];
    }
    this.food.ingredients.push(ingredient);
  }

  deleteIngredient(i: number) {
    this.food.ingredients.splice(i, 1);
  }

}
