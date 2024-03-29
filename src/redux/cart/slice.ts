import {getCartFromLS} from "../../utils/getCartFromLS";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {CartItem, CartSliceState} from "./types";

const {items, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice,
    items
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(item => item.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
        removeItemCart(state, action: PayloadAction<string>) {
            const findItemCart = state.items.find(item => item.id === action.payload);
            if (findItemCart) findItemCart.count--;
        }
    }
});
export const {addItem, removeItem, clearItems, removeItemCart} = cartSlice.actions

export default cartSlice.reducer