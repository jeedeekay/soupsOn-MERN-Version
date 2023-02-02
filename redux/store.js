import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from '../features/recipes/recipesSlice';
import { articlesReducer } from '../features/articles/articlesSlice';
import { favoriteRecipesReducer } from '../features/favorites/favoriteRecipesSlice';
import { favoriteArticlesReducer } from '../features/favorites/favoriteArticlesSlice';

export const store = configureStore({
    reducer:{
        recipes: recipesReducer,
        articles: articlesReducer,
        favRecipes: favoriteRecipesReducer,
        favArticles: favoriteArticlesReducer
    }
});