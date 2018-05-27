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
  price: number;
  @Input() visible: Boolean;
  @Output() visibleChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output() drinksSelection: EventEmitter<String> = new EventEmitter<String>();

  constructor(private drinkService: DrinksService) { }

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks() {
    this.drinkService.getDrinks().subscribe(drinks => {
      this.drinks = drinks;
      this.selection = [];
      this.price = 0;
    });
  }

  getQuantity(drink: Drink): number {
    const d = this.selection.find(v => v.drinkId === drink._id);

    return d ? d.quantity : 0;
  }

  drinkSelection(drink: Drink) {
    const d = this.selection.findIndex(v => v.drinkId === drink._id);
    if (d !== -1) {
      this.selection[d].quantity = this.selection[d].quantity.valueOf() + 1;
    } else {
      this.selection.push({ drinkId: drink._id, name: drink.name, quantity: 1 });
    }
    this.price += drink.price;
  }

  saveSelection() {
    if (this.selection[0]) {
      const drinks = this.selection,
      price = this.price,
      date = new Date();
      this.drinkService.saveDrinkSelection({drinks, price, isPaid: false, created: date, updated: date}).subscribe(res => {
        this.resetSelection();
        this.closeSelector();
        this.drinksSelection.emit(res._id);
      });
    } else {
      this.cancelSelection();
    }
  }

  closeSelector() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  cancelSelection() {
    this.resetSelection();
    this.closeSelector();
    this.drinksSelection.emit(null);
  }

  resetSelection() {
    this.selection = [];
    this.price = 0;
  }
}
