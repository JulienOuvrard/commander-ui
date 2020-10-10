import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DrinksService } from '../services/drinks.service';
import { Drink, DrinkSelection, DrinkGroupBy } from '../models/drink.model';
import { groupBy } from '../utils';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'cmdr-drink-choice',
  templateUrl: './drink-choice.component.html',
  styleUrls: ['./drink-choice.component.scss']
})
export class DrinkChoiceComponent implements OnInit {

  drinks: Drink[];
  categories: string[];
  selection: DrinkSelection[];
  price: number;
  drinkByCategory: {[s: string]: Drink[]};
  drinkHidden: { [s: string]: boolean };
  @Input() visible: Boolean;
  @Output() visibleChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output() drinksSelection: EventEmitter<String> = new EventEmitter<String>();

  constructor(private drinkService: DrinksService) { }

  ngOnInit() {
    this.initDrinks();
  }

  initDrinks() {
    forkJoin([this.drinkService.getDrinkCategories(), this.drinkService.getDrinks(), this.drinkService.getDrinksByCategories()]).subscribe(
      ([categories, drinks, groupByCategory]) => {
      this.categories = categories;
      this.drinkHidden = {};
      this.categories.forEach(cat => {
        this.drinkHidden[cat] = true;
      });
      this.selection = [];
      this.price = 0;

      this.drinks = drinks;

      this.drinkByCategory = this.reduceCategories(groupByCategory);
    });
  }

  getDrinks() {
    this.drinkService.getDrinks().subscribe(drinks => {
      this.drinks = drinks;
    });
  }

  getDrinkCategories() {
    this.drinkService.getDrinkCategories().subscribe(categories => {
      this.categories = categories;
      this.drinkHidden = {};
      this.categories.forEach(cat => {
        this.drinkHidden[cat] = true;
      });
      this.selection = [];
      this.price = 0;
    });
  }

  getDrinksByCategories() {
    this.drinkService.getDrinksByCategories().subscribe(groupByCategory => {
      this.drinkByCategory = this.reduceCategories(groupByCategory);
    });
  }

  groupByCategory(items) {
    return groupBy(items, 'category');
  }

  reduceCategories(groups: DrinkGroupBy[]) {
    return groups.reduce((acc, drinkGroup) => {
      acc[drinkGroup._id] = drinkGroup.drinks;
      return acc;
    }, {});
  }

  toggleList(event, category) {
    event.preventDefault();
    this.drinkHidden[category] = !this.drinkHidden[category];
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

  drinkDeselection(drink: Drink, event: MouseEvent) {
    event.stopImmediatePropagation();
    const d = this.selection.findIndex(v => v.drinkId === drink._id);
    if (d !== -1) {
      this.selection[d].quantity = this.selection[d].quantity.valueOf() - 1;
      this.price -= drink.price;
    }
    this.selection = this.selection.filter(sel => sel.quantity !== 0);
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
