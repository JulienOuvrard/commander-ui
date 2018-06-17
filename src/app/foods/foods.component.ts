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
  editingMode: boolean;
  editingIndex: number;
  isAdding: boolean;
  editFoodBody: Food;
  newFoodBody: Food;
  uploadFile: File;
  showDetail: boolean;
  detailBody: Food;

  constructor(private foodService: FoodsService) { }

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    this.foodService.getFoods().subscribe(foods => {
      this.editingMode = false;
      this.isAdding = false;
      this.showDetail = false;
      this.editFoodBody = null;
      this.newFoodBody = null;
      this.editingIndex = null;
      this.detailBody = null;
      this.foods = foods;
    });
  }

  addFood() {
    this.isAdding = true;
    this.showDetail = true;
    const date = new Date();
    this.newFoodBody = {
      name: null,
      category: null,
      price: 0,
      quantity: 1,
      needCooking: false,
      hasIngredients: false,
      created: date,
      updated: date
    };
    this.detailBody = this.newFoodBody;
  }

  cancelAdding() {
    this.isAdding = false;
    this.showDetail = false;
    this.newFoodBody = null;
    this.detailBody = this.newFoodBody;
  }

  saveNewFood() {
    this.foodService.saveFood(this.newFoodBody).subscribe(data => {
      this.getFoods();
    });
  }

  editFood(index: number) {
    this.editingMode = true;
    this.showDetail = true;
    this.editingIndex = index;
    this.editFoodBody = this.foods[index];
    this.detailBody = this.editFoodBody;
  }

  cancelEditing() {
    this.editingMode = false;
    this.showDetail = false;
    this.editFoodBody = null;
    this.editingIndex = null;
    this.detailBody = this.editFoodBody;
  }

  isEditing(index: number): boolean {
    return this.editingMode && this.editingIndex === index;
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

  detailChange(food: Food) {
    if (food === null) {
      this.isAdding = false;
      this.editingMode = false;
      this.showDetail = false;
      this.editFoodBody = null;
      this.newFoodBody = null;
      this.detailBody = null;
      return;
    }
    if (this.editingMode) {
      this.editFoodBody = food;
      this.saveEditedFood(food._id);
    } else if (this.isAdding) {
      this.newFoodBody = food;
      this.saveNewFood();
    }
  }

}
