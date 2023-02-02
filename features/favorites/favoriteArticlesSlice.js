import { createSlice } from '@reduxjs/toolkit';

const favoriteArticlesSlice = createSlice({
    name: 'favArticles',
    initialState: [],
    reducers: {
        toggleFavArticle: (favArticles, action) => {
            if (favArticles.includes(action.payload)) {
                return favArticles.filter((favorite) => favorite !== action.payload);
            } else {
                favArticles.push(action.payload);
                console.log(favArticles);
            }
        }
    }
});

export const { toggleFavArticle } = favoriteArticlesSlice.actions;
export const favoriteArticlesReducer = favoriteArticlesSlice.reducer;