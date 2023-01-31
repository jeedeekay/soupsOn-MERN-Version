import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from '../features/recipes/recipesSlice';
import { articlesReducer } from '../features/articles/articlesSlice';
import { favoritesReducer } from '../features/favorites/favoritesSlice';

export const store = configureStore({
    reducer:{
        recipes: recipesReducer,
        articles: articlesReducer,
        favorites: favoritesReducer
    }
});