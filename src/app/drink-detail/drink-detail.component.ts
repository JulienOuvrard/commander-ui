import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Drink } from '../models/drink.model';

@Component({
  selector: 'cmdr-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})
export class DrinkDetailComponent implements OnInit {

  @Input() hidden: boolean;
  @Input() drink: Drink;
  @Output() drinkChange: EventEmitter<Drink>;

  constructor() {
    this.drinkChange = new EventEmitter<Drink>();
  }

  ngOnInit() {
  }

  saveDrink() {
    this.drinkChange.emit(this.drink);
  }

  cancel() {
    this.hidden = true;
    this.drink = null;
    this.drinkChange.emit(null);
  }

}
