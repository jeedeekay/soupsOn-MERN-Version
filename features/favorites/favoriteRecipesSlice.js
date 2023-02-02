import { createSlice } from '@reduxjs/toolkit';

const favoriteRecipesSlice = createSlice({
    name: 'favRecipes',
    initialState: [],
    reducers: {
        toggleFavorite: (favRecipes, action) => {
            if (favRecipes.includes(action.payload)) {
                return favRecipes.filter((favorite) => favorite !== action.payload);
            } else {
                favRecipes.push(action.payload);
                console.log(favRecipes);
            }
        }
    }
});

export const { toggleFavorite } = favoriteRecipesSlice.actions;
export const favoriteRecipesReducer = favoriteRecipesSlice.reducer;