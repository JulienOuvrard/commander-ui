import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrinksComponent } from './drinks/drinks.component';
import { FoodsComponent } from './foods/foods.component';
import { MealsComponent } from './meals/meals.component';
import { CommandsComponent } from './commands/commands.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DrinksService } from './services/drinks.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FoodsService } from './services/foods.service';
import { CommandDetailComponent } from './command-detail/command-detail.component';
import { CommandsService } from './services/commands.service';
import { DrinkChoiceComponent } from './drink-choice/drink-choice.component';
import { FoodChoiceComponent } from './food-choice/food-choice.component';
import { registerLocaleData } from '@angular/common';

import localefr from '@angular/common/locales/fr';
import { RoundsComponent } from './rounds/rounds.component';
registerLocaleData(localefr);

@NgModule({
  declarations: [
    AppComponent,
    DrinksComponent,
    FoodsComponent,
    MealsComponent,
    CommandsComponent,
    HomeComponent,
    DashboardComponent,
    CommandDetailComponent,
    DrinkChoiceComponent,
    FoodChoiceComponent,
    RoundsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DrinksService, FoodsService, CommandsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
