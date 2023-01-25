import { createSlice } from '@reduxjs/toolkit';
import RECIPES from '../../shared/RECIPES';

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: { recipesArray: RECIPES },
    reducers: {},
    extraReducers: {}
});

export const recipesReducer = recipesSlice.reducer;