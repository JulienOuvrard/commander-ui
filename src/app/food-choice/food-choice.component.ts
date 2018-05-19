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
  price: number;
  @Input() visible: Boolean;
  @Output() visibleChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output() foodsSelection: EventEmitter<string> = new EventEmitter<string>();
  constructor(private foodService: FoodsService) { }

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    this.foodService.getFoods().subscribe(foods => {
      this.foods = foods;
      this.selection = [];
      this.price = 0;
    });
  }

  getQuantity(food: Food): boolean {
    const d = this.selection.find(v => v.food === food._id);

    return d !== undefined;
  }

  foodSelection(food: Food) {
    this.selection.push({ food: food._id});
    this.price += food.price;
  }

  saveSelection() {
    if (this.selection[0]) {
      const foods = this.selection,
      price = this.price,
      date = new Date();
      this.foodService.saveFoodSelection({foods, price, created: date, updated: date}).subscribe(res => {
        this.closeSelector();
        this.foodsSelection.emit(res._id);
      });
    } else {
      this.cancelSelection();
    }
  }

  closeSelector() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  cancelSelection() {
    this.resetSelection();
    this.closeSelector();
    this.foodsSelection.emit(null);
  }

  resetSelection() {
    this.selection = [];
    this.price = 0;
  }

}
