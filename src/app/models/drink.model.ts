export interface DrinkSelection {
    drink: string;
    quantity: number;
}

export interface Drink {
    _id?: string;
    name: string;
    quantity: number;
    price: number;
    currency?: string;
    created: Date;
    updated?: Date;
}
