import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Food, FoodSelection } from '../models/food.model';
import { FoodsService } from '../services/foods.service';

@Component({
  selector: 'cmdr-food-choice',
  templateUrl: './food-choice.component.html',
  styleUrls: ['./food-choice.component.scss']
})
export class FoodChoiceComponent implements OnInit {

  foods: Food[];
  selection: FoodSelection[];
  @Input() visible: Boolean;
  @Output() visibleChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output() foodsSelection: EventEmitter<any> = new EventEmitter<any>();
  constructor(private foodService: FoodsService) { }

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    this.foodService.getFoods().subscribe(foods => {
      this.foods = foods;
    });
  }

  foodSelection(food: Food) {
    this.selection.push({ food: food._id});
  }

  saveSelection() {
    if (this.selection[0]) {
      this.foodsSelection.emit(this.selection);
    } else {
      this.foodsSelection.emit(null);
    }
  }

  cancelSelection() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.selection = [];
    this.foodsSelection.emit(null);
  }

}
