import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Food, FoodSelection } from '../models/food.model';
import { FoodsService } from '../services/foods.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'cmdr-food-choice',
  templateUrl: './food-choice.component.html',
  styleUrls: ['./food-choice.component.scss']
})
export class FoodChoiceComponent implements OnInit {

  foods: Food[];
  selection: FoodSelection[];
  price: number;
  cookings = [{
    value: 'B',
    label: 'Bleu'
  },
  {
    value: 'S',
    label: 'Saignant'
  },
  {
    value: 'AP',
    label: 'A Point'
  },
  {
    value: 'BC',
    label: 'Bien Cuit'
  }];
  foodCookings: {[s: string]: string};
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
      this.foodCookings = {};
    });
  }

  getQuantity(food: Food): number {
    const d = this.selection.find(v => v.foodId === food._id);

    return d ? d.quantity : 0;
  }

  foodCookingSelection(food: Food, cooking: string) {
    this.foodCookings[food._id] = cooking;

    const d = this.selection.findIndex(v => v.foodId === food._id);
    if (d !== -1) {
      this.selection[d].cooking = this.foodCookings[food._id];
    }
  }

  foodSelection(food: Food) {
    const d = this.selection.findIndex(v => v.foodId === food._id);
    if (d !== -1) {
      this.selection[d].quantity = this.selection[d].quantity + 1;
    } else {
      const foodSelectionBody: FoodSelection = {
        foodId: food._id,
        name: food.name,
        quantity: 1
      };
      if (food.needCooking) {
        this.foodCookings[food._id] = null;
      }
      this.selection.push(foodSelectionBody);
    }
    this.price += food.price;
  }

  saveSelection() {
    if (this.selection[0]) {
      const foods = this.selection,
        price = this.price,
        date = new Date();
      this.foodService.saveFoodSelection({ foods, price, isPaid: false, created: date, updated: date }).subscribe(res => {
        this.resetSelection();
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
    this.foodCookings = {};
  }

}
