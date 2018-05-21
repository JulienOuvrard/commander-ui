export interface FoodSelection {
    food: string;
    name: string;
    quantity: number;
    cooking?: string;
    options?: string[];
}

export interface Food {
    _id?: string;
    name: string;
    quantity: number;
    price: number;
    needCooking: Boolean;
    hasIngredients: Boolean;
    currency?: string;
    created: Date;
    updated?: Date;
}
