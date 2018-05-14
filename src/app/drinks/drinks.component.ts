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
  editDrinkBody: Drink;
  constructor(private drinkService: DrinksService) { }

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks() {
    this.drinkService.getDrinks().subscribe(drinks => {
      this.isEditing = false;
      this.drinks = drinks;
    });
  }

  addDrink() {
    console.log('ToggleNew');
  }

  editDrink(index) {
    console.log('ToggleEditing');
    this.isEditing = true;
    this.editDrinkBody = this.drinks[index];
  }

  cancelEditing() {
    console.log('ToggleEditing');
    this.isEditing = false;
  }

  saveEditedDrink(drinkId: string) {
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
