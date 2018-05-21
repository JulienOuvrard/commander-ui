import { Component, OnInit } from '@angular/core';
import { DrinksService } from '../services/drinks.service';
import { Drink } from '../models/drink.model';

@Component({
  selector: 'cmdr-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

  drinks: Drink[];
  editingMode: boolean;
  editingIndex: number;
  isAdding: boolean;
  editDrinkBody: Drink;
  newDrinkBody: Drink;
  uploadFile: File;

  constructor(private drinkService: DrinksService) { }

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks() {
    this.drinkService.getDrinks().subscribe(drinks => {
      this.editingMode = false;
      this.isAdding = false;
      this.newDrinkBody = null;
      this.editingIndex = null;
      this.drinks = drinks;
    });
  }

  addDrink() {
    this.isAdding = true;
    const date = new Date();
    this.newDrinkBody = {name: null, price: 0, quantity: 1, created: date, updated: date};
  }

  cancelAdding() {
    this.isAdding = false;
    this.newDrinkBody = null;
  }

  saveNewDrink() {
    this.drinkService.saveDrink(this.newDrinkBody).subscribe(data => {
      this.getDrinks();
    });
  }

  editDrink(index: number) {
    this.editingMode = true;
    this.editingIndex = index;
    this.editDrinkBody = this.drinks[index];
  }

  cancelEditing() {
    this.editingMode = false;
    this.editDrinkBody = null;
    this.editingIndex = null;
  }

  isEditing(index: number): boolean {
    return this.editingMode && this.editingIndex === index;
  }

  saveEditedDrink(drinkId: string) {
    this.editDrinkBody.updated = new Date();
    this.drinkService.updateDrink(drinkId, this.editDrinkBody).subscribe(oldDrink => {
      console.log(oldDrink);
      this.getDrinks();
    });
  }

  deleteDrink(drinkId: string) {
    this.drinkService.deleteDrink(drinkId).subscribe(deleted => {
      console.log(deleted);
      this.getDrinks();
    });
  }

  changeUploadFile(files: FileList) {
    this.uploadFile = files.item(0);
  }

  uploadDrinks() {
    this.drinkService.importDrinks(this.uploadFile).subscribe(success => {
      this.uploadFile = null;
      this.getDrinks();
    });
  }

}
