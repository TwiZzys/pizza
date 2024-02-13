import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    categoryID: 0,
    currentPage: 1,
    sort: {
        name: 'Популярности(ASC)',
        sortType: '-rating'
    }
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryID(state, action) {
            state.categoryID = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            state.categoryID = Number(action.payload.categoryID);
        }
    }
})


export const sortSelector = state => state.filter.sort;
export const filterSelector = state => state.filter;
// Action creators are generated for each case reducer function
export const {setCategoryID, setSort, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer