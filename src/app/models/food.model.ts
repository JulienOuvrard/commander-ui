export interface FoodSelection {
    foodId: string;
    name: string;
    quantity: number;
    cooking?: string;
    options?: string[];
}

export interface Food {
    _id?: string;
    name: string;
    category: string;
    quantity: number;
    price: number;
    needCooking: Boolean;
    hasIngredients: Boolean;
    ingredients?: string[];
    currency?: string;
    created: Date;
    updated?: Date;
}

export interface FoodGroupBy {
  _id: string;
  drinks: Food[];
}
