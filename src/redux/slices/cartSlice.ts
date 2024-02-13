import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(item => item.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice = state.items.reduce((sum, item) => {
                return (item.price * item.count) + sum;
            }, 0);
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
        removeItemCart(state, action) {
            const findItemCart = state.items.find(item => item.id === action.payload);
            if (findItemCart) findItemCart.count--;
        }
    }
})


export const cartSelector = (state) => state.cart;
export const cartItemSelectorById = (id) => (state) => state => state.cart.items.find(item => item.id === id);

// Action creators are generated for each case reducer function
export const {addItem, removeItem, clearItems, removeItemCart} = cartSlice.actions

export default cartSlice.reducer