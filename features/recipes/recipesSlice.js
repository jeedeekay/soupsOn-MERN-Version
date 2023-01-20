import { createSlice } from '@reduxjs/toolkit';

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: [],
    reducers: {},
    extraReducers: {}
});

export const recipesReducer = recipesSlice.reducer;