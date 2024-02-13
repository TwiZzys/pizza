import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}

export type Sort = {
    name: string,
    sortType: SortPropertyEnum
}

export interface FilterSliceState {
    categoryID: number,
    currentPage: number,
    sort: Sort,
    searchValue: string
}

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


export const sortSelector = (state: RootState) => state.filter.sort;
export const filterSelector = (state: RootState) => state.filter;
// Action creators are generated for each case reducer function
export const {setCategoryID, setSort, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer