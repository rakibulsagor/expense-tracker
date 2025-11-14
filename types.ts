export enum Category {
    Food = 'Food',
    Transport = 'Transport',
    Shopping = 'Shopping',
    Bills = 'Bills',
    Entertainment = 'Entertainment',
    Health = 'Health',
    Other = 'Other'
}

export interface Expense {
    id: string;
    amount: number;
    description: string;
    category: Category;
    date: string;
}

export interface Income {
    id: string;
    amount: number;
    source: string;
    date: string;
}