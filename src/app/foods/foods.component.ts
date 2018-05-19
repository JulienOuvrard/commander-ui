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
  uploadFile: File;

  constructor(private foodService: FoodsService) { }

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    this.foodService.getFoods().subscribe(foods => {
      this.isEditing = false;
      this.isAdding = false;
      this.newFoodBody = null;
      this.foods = foods;
    });
  }

  addFood() {
    this.isAdding = true;
    const date = new Date();
    this.newFoodBody = {name: null, price: 0, quantity: 1, needCooking: false, hasIngredients: false, created: date, updated: date};
  }

  cancelAdding() {
    this.isAdding = false;
    this.newFoodBody = null;
  }

  saveNewFood() {
    this.foodService.saveFood(this.newFoodBody).subscribe(data => {
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
    this.foodService.updateFood(FoodId, this.editFoodBody).subscribe(oldFood => {
      console.log(oldFood);
      this.getFoods();
    });
  }

  deleteFood(FoodId: string) {
    this.foodService.deleteFood(FoodId).subscribe(deleted => {
      console.log(deleted);
      this.getFoods();
    });
  }

  changeUploadFile(files: FileList) {
    this.uploadFile = files.item(0);
  }

  uploadFoods() {
    this.foodService.importFoods(this.uploadFile).subscribe(success => {
      this.uploadFile = null;
      this.getFoods();
    });
  }

}
