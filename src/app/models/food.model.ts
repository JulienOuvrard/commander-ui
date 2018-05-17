export interface FoodSelection {
    food: String;
    cooking?: String;
    options?: String[];
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
