import { FoodSelection } from './food.model';

export interface Meal {
    _id?: string;
    foods: FoodSelection[];
    price: number;
    created: Date;
    updated?: Date;
}
