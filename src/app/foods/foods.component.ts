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
    console.log('ToggleNew');
    this.isAdding = true;
    this.newFoodBody = {name: '', price: 0, quantity: 1};
  }

  cancelAdding() {
    console.log('ToggleNew');
    this.isAdding = false;
    this.newFoodBody = null;
  }

  saveNewFood() {
    this.FoodService.saveFood(this.newFoodBody).subscribe(data => {
      this.getFoods();
    });
  }

  editFood(index) {
    console.log('ToggleEditing');
    this.isEditing = true;
    this.editFoodBody = this.foods[index];
  }

  cancelEditing() {
    console.log('ToggleEditing');
    this.isEditing = false;
    this.editFoodBody = null;
  }

  saveEditedFood(FoodId: string) {
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
