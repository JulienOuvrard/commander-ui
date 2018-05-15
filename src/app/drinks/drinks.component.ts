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
  isEditing: boolean;
  isAdding: boolean;
  editDrinkBody: Drink;
  newDrinkBody: Drink;
  constructor(private drinkService: DrinksService) { }

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks() {
    this.drinkService.getDrinks().subscribe(drinks => {
      this.isEditing = false;
      this.isAdding = false;
      this.newDrinkBody = null;
      this.drinks = drinks;
    });
  }

  addDrink() {
    console.log('ToggleNew');
    this.isAdding = true;
    const date = new Date();
    this.newDrinkBody = {name: '', price: 0, quantity: 1, created: date, updated: date};
  }

  cancelAdding() {
    console.log('ToggleNew');
    this.isAdding = false;
    this.newDrinkBody = null;
  }

  saveNewDrink() {
    this.drinkService.saveDrink(this.newDrinkBody).subscribe(data => {
      this.getDrinks();
    });
  }

  editDrink(index) {
    console.log('ToggleEditing');
    this.isEditing = true;
    this.editDrinkBody = this.drinks[index];
  }

  cancelEditing() {
    console.log('ToggleEditing');
    this.isEditing = false;
    this.editDrinkBody = null;
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

}
