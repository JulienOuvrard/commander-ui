import { Component, OnInit } from '@angular/core';
import { Food } from '../models/food.model';
import { FoodsService } from '../services/foods.service';

@Component({
  selector: 'cmdr-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {

  foods: Food[];
  isEditing: boolean;
  isAdding: boolean;
  editFoodBody: Food;
  newFoodBody: Food;
  constructor(private FoodService: FoodsService) { }

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    this.FoodService.getFoods().subscribe(foods => {
      this.isEditing = false;
      this.isAdding = false;
      this.newFoodBody = null;
      this.foods = foods;
    });
  }

  addFood() {
    this.isAdding = true;
    const date = new Date();
    this.newFoodBody = {name: null, price: 0, quantity: 1, created: date, updated: date};
  }

  cancelAdding() {
    this.isAdding = false;
    this.newFoodBody = null;
  }

  saveNewFood() {
    this.FoodService.saveFood(this.newFoodBody).subscribe(data => {
      this.getFoods();
    });
  }

  editFood(index) {
    this.isEditing = true;
    this.editFoodBody = this.foods[index];
  }

  cancelEditing() {
    this.isEditing = false;
    this.editFoodBody = null;
  }

  saveEditedFood(FoodId: string) {
    this.editFoodBody.updated = new Date();
    this.FoodService.updateFood(FoodId, this.editFoodBody).subscribe(oldFood => {
      console.log(oldFood);
      this.getFoods();
    });
  }

  deleteFood(FoodId: string) {
    this.FoodService.deleteFood(FoodId).subscribe(deleted => {
      console.log(deleted);
      this.getFoods();
    });
  }

}
