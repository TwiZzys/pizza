export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
}

export type Pizza = {
    id: string,
    price: number,
    title: string,
    imageUrl: string,
    sizes: number[],
    types: number[]
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = "error"

}

export interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}