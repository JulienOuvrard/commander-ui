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
  constructor(private drinkService: DrinksService) { }

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks() {
    this.drinkService.getDrinks().subscribe(drinks => this.drinks = drinks);
  }

  editDrink(drinkId: string) {
    console.log(drinkId);
  }

  deleteDrink(drinkId: string) {
    this.drinkService.deleteDrink(drinkId).subscribe(deleted => {
      console.log(deleted);
      this.getDrinks();
    });
  }

}
