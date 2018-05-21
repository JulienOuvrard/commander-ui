import { DrinkSelection } from './drink.model';

export interface Round {
    _id?: string;
    drinks: DrinkSelection[];
    price: number;
    isPaid: boolean;
    created: Date;
    updated?: Date;
}
