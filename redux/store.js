import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from '../features/recipes/recipesSlice';
import { articlesReducer } from '../features/articles/articlesSlice';

export const store = configureStore({
    reducer:{
        recipes: recipesReducer,
        articles: articlesReducer
    }
});