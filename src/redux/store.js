import {configureStore} from '@reduxjs/toolkit'
import filterSlice from "./slices/filterSlice";
import searchSlice from "../redux/slices/searchSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        search: searchSlice
    },
})