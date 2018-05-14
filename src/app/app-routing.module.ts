import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrinksComponent } from './drinks/drinks.component';
import { MealsComponent } from './meals/meals.component';
import { FoodsComponent } from './foods/foods.component';
import { HomeComponent } from './home/home.component';
import { CommandsComponent } from './commands/commands.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'drinks',
    component: DrinksComponent
  },
  {
    path: 'meals',
    component: MealsComponent
  },
  {
    path: 'foods',
    component: FoodsComponent
  },
  {
    path: 'commands',
    component: CommandsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
