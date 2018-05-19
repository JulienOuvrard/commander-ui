import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Command } from '../models/command.model';
import { CommandsService } from '../services/commands.service';
import { DrinkSelection } from '../models/drink.model';
import { FoodSelection } from '../models/food.model';
import { DrinksService } from '../services/drinks.service';
import { FoodsService } from '../services/foods.service';

@Component({
  selector: 'cmdr-command-detail',
  templateUrl: './command-detail.component.html',
  styleUrls: ['./command-detail.component.scss']
})
export class CommandDetailComponent implements OnInit {

  commandId: string;
  isNew: boolean;
  commandBody: Command;
  commandDetails: any[];

  constructor(private router: Router, public route: ActivatedRoute, private commandsService: CommandsService,
    private drinkService: DrinksService, private foodService: FoodsService) {
    this.route.params.subscribe(params => {
      this.commandId = params['id'];
      this.isNew = this.commandId === '' || this.commandId === undefined || this.commandId === null;
    });
  }

  ngOnInit() {
    if (this.isNew) {
      const date = new Date();
      this.commandBody = {
        name: null,
        price: 0,
        drinks: [],
        rounds: [],
        meals: [],
        isPaid: false,
        created: date,
        updated: date
      };
      this.commandDetails = [];
    } else {
      this.getCommand(this.commandId);
    }
  }

  getCommand(commandId: string) {
    this.commandsService.getCommand(commandId).subscribe(command => this.commandBody = command);
  }

  saveCommand() {
    this.commandsService.saveCommand(this.commandBody).subscribe(res => {
      console.log(res);
    });
  }

  updateCommand() {
    this.commandBody.updated = new Date();
    this.commandsService.updateCommand(this.commandId, this.commandBody).subscribe(res => {
      console.log(res);
    });
  }

  goBack() {
    this.router.navigate(['commands']);
  }

  drinkSelection(selection: string) {
    if (selection !== null) {
      this.commandBody.drinks.push(selection);
    }
  }

  roundSelection(selection: string) {
    if (selection !== null) {
      this.drinkService.getRound(selection).subscribe(round => {
        const detailStr = round.drinks.map(curr => {
          return `(${curr.quantity}) ${curr.name}`;
        }).join(', ');
        this.commandDetails.push({id: round._id, type: 'round', price: round.price, detail: detailStr});
        this.commandBody.rounds.push(selection);
        this.commandBody.price += round.price;
      });
    }
  }

  mealSelection(selection: string) {
    if (selection !== null) {
      this.foodService.getMeal(selection).subscribe(meal => {
        const detailStr = meal.foods.map(curr => {
          return curr.name;
        }).join(', ');
        this.commandDetails.push({id: meal._id, type: 'meal', price: meal.price, detail: detailStr});
        this.commandBody.meals.push(selection);
        this.commandBody.price += meal.price;
      });
    }
  }

  getCommandDetail(): any[] {
    return [];
  }
}
