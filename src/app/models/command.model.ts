export interface Command {
    _id?: string;
    name: string;
    price: number;
    drinks: string[];
    meals: string[];
    isPaid: boolean;
    created: Date;
    updated?: Date;
}
