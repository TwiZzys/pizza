import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {Sort} from "./filterSlice";


export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
}
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {order, sortBy, category, search, currentPage} = params;
        const {data} = await axios.get<Pizza[]>(`https://64a05b77ed3c41bdd7a73d72.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
        return data;
    }
);

type Pizza = {
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

interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        })
    },
})

export const pizzaSelector = (state: RootState) => state.pizza;
export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;