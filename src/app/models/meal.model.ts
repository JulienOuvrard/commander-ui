import { FoodSelection } from './food.model';

export interface Meal {
    _id?: string;
    foods: FoodSelection[];
    isPaid: boolean;
    price: number;
    created: Date;
    updated?: Date;
}
