import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DrinksService } from '../services/drinks.service';
import { Drink, DrinkSelection } from '../models/drink.model';

@Component({
  selector: 'cmdr-drink-choice',
  templateUrl: './drink-choice.component.html',
  styleUrls: ['./drink-choice.component.scss']
})
export class DrinkChoiceComponent implements OnInit {

  drinks: Drink[];
  selection: DrinkSelection[];
  @Input() visible: Boolean;
  @Output() visibleChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output() drinksSelection: EventEmitter<any> = new EventEmitter<any>();

  constructor(private drinkService: DrinksService) { }

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks() {
    this.drinkService.getDrinks().subscribe(drinks => {
      this.drinks = drinks;
      this.selection = [];
    });
  }

  drinkSelection(drink: Drink) {
    const d = this.selection.findIndex(v => v.drink === drink._id);
    if (d !== -1) {
      this.selection[d].quantity = this.selection[d].quantity.valueOf() + 1;
    } else {
      this.selection.push({ drink: drink._id, quantity: 1 });
    }
  }

  saveSelection() {
    if (this.selection[0]) {
      this.drinksSelection.emit(this.selection);
    } else {
      this.drinksSelection.emit(null);
    }
  }

  cancelSelection() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.selection = [];
    this.drinksSelection.emit(null);
  }
}
