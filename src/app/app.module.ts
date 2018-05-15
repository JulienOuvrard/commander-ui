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

@NgModule({
  declarations: [
    AppComponent,
    DrinksComponent,
    FoodsComponent,
    MealsComponent,
    CommandsComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DrinksService, FoodsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
