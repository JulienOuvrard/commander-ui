import { Component, OnInit } from '@angular/core';
import { DrinksService } from '../services/drinks.service';
import { Drink } from '../models/drink.model';

@Component({
  selector: 'cmdr-drink-choice',
  templateUrl: './drink-choice.component.html',
  styleUrls: ['./drink-choice.component.scss']
})
export class DrinkChoiceComponent implements OnInit {

  drinks: Drink[];
  constructor(private drinkService: DrinksService) { }

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks() {
    this.drinkService.getDrinks().subscribe(drinks => {
      this.drinks = drinks;
    });
  }

  drinkSelection(drinkId: string) {
    console.log('selection', drinkId);
  }
}
