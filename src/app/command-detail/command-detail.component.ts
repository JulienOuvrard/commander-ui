import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Command, CommandDetail } from '../models/command.model';
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
  commandDetails: CommandDetail[];
  commandDetailGroupBy: {[s: string]: CommandDetail[]};

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
        rounds: [],
        meals: [],
        isPaid: false,
        created: date,
        updated: date
      };
      this.commandDetails = [];
      this.commandDetailGroupBy = {
        round: [],
        meal: []
      };
    } else {
      this.getCommand(this.commandId);
    }
  }

  getCommand(commandId: string) {
    this.commandsService.getCommand(commandId).subscribe(command => {
      this.commandBody = command;
      this.getCommandDetail(command);
    });
  }

  saveCommand() {
    this.commandsService.saveCommand(this.commandBody).subscribe(res => {
      console.log(res);
      this.router.navigate(['commands']);
    });
  }

  updateCommand() {
    this.commandBody.updated = new Date();
    this.commandsService.updateCommand(this.commandId, this.commandBody).subscribe(res => {
      console.log(res);
      this.router.navigate(['commands']);
    });
  }

  payDetail(detail: CommandDetail, checked: boolean) {
    detail.paid = checked;
    if (detail.type === 'round') {
      this.drinkService.updateRound(detail.id, {isPaid: checked}).subscribe(res => {
        const det = this.commandDetails.find(cDetail => cDetail.id === res._id);
        det.paid = checked;
        this.verifyAllPaid();
      });
    } else if (detail.type === 'meal') {
      this.foodService.updateMeal(detail.id, {isPaid: checked}).subscribe(res => {
        const det = this.commandDetails.find(cDetail => cDetail.id === res._id);
        det.paid = checked;
        this.verifyAllPaid();
      });
    }
  }

  verifyAllPaid() {
    this.commandBody.isPaid = this.commandDetails.every(detail => detail.paid);
  }

  goBack() {
    this.router.navigate(['commands']);
  }

  roundSelection(selection: string) {
    if (selection !== null) {
      this.drinkService.getRound(selection).subscribe(round => {
        const detailStr = round.drinks.map(curr => {
          return `(${curr.quantity}) ${curr.name}`;
        }).join(', ');
        const detail = {id: round._id, type: 'round', price: round.price, paid: round.isPaid, detail: detailStr};
        this.commandDetails.push(detail);
        this.commandDetailGroupBy['round'].push(detail);
        this.commandBody.rounds.push(selection);
        this.commandBody.price += round.price;
      });
    }
  }

  mealSelection(selection: string) {
    if (selection !== null) {
      this.foodService.getMeal(selection).subscribe(meal => {
        const detailStr = meal.foods.map(curr => {
          return `(${curr.quantity}) ${curr.name} ${curr.cooking ? `[${curr.cooking}]` : ``}`;
        }).join(', ');
        const detail = {id: meal._id, type: 'meal', price: meal.price, paid: meal.isPaid, detail: detailStr};
        this.commandDetails.push(detail);
        this.commandDetailGroupBy['meal'].push(detail);
        this.commandBody.meals.push(selection);
        this.commandBody.price += meal.price;
      });
    }
  }

  getCommandDetail(command: Command) {
    this.commandDetails = [];
    this.commandDetailGroupBy = {
      round: [],
      meal: []
    };
    command.meals.forEach(mealId => {
      this.foodService.getMeal(mealId).subscribe(meal => {
        const detailStr = meal.foods.map(curr => {
          return `(${curr.quantity}) ${curr.name} ${curr.cooking ? `[${curr.cooking}]` : ``}`;
        }).join(', ');
        const detail = {id: meal._id, type: 'meal', price: meal.price, paid: meal.isPaid, detail: detailStr};
        this.commandDetails.push(detail);
        this.commandDetailGroupBy['meal'].push(detail);
      });
    });
    command.rounds.forEach(roundId => {
      this.drinkService.getRound(roundId).subscribe(round => {
        const detailStr = round.drinks.map(curr => {
          return `(${curr.quantity}) ${curr.name}`;
        }).join(', ');
        const detail = {id: round._id, type: 'round', price: round.price, paid: round.isPaid, detail: detailStr};
        this.commandDetails.push(detail);
        this.commandDetailGroupBy['round'].push(detail);
      });
    });
  }
}
