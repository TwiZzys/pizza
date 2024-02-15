import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FilterSliceState, Sort, SortPropertyEnum} from "./types";

const initialState: FilterSliceState = {
    categoryID: 0,
    currentPage: 1,
    searchValue: '',
    sort: {
        name: 'Популярности(ASC)',
        sortType: SortPropertyEnum.RATING_ASC
    }
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryID(state, action: PayloadAction<number>) {
            state.categoryID = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            state.categoryID = Number(action.payload.categoryID);
        }
    }
})

export const {setCategoryID, setSort, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer