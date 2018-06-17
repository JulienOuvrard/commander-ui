export interface DrinkSelection {
    drinkId: string;
    name: string;
    quantity: number;
}

export interface Drink {
    _id?: string;
    name: string;
    category: string;
    quantity: number;
    price: number;
    currency?: string;
    created: Date;
    updated?: Date;
}
