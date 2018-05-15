export interface Food {
    _id?: string;
    name: string;
    quantity: number;
    price: number;
    currency?: string;
    created: Date;
    updated?: Date;
}
