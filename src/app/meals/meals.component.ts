import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal.model';
import { MealsService } from '../services/meals.service';

@Component({
  selector: 'cmdr-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {

  meals: Meal[];
  constructor(private MealService: MealsService) { }

  ngOnInit() {
    this.getMeals();
  }
  getMeals() {
    this.MealService.getMeals().subscribe(meals => {
      this.meals = meals;
    });
  }
  editMeal(mealId: string) {

  }
  deleteMeal(mealId: string) {

  }

}
