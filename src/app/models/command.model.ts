export interface CommandDetail {
    id: string;
    type: string;
    paid: boolean;
    price: number;
    detail: string;
}
export interface Command {
    _id?: string;
    name: string;
    price: number;
    rounds: string[];
    meals: string[];
    isPaid: boolean;
    created: Date;
    updated?: Date;
}
