import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from '../features/recipes/recipesSlice';
import { articlesReducer } from '../features/articles/articlesSlice';
import { commentsReducer } from '../features/comments/commentsSlice';
import { favoriteRecipesReducer } from '../features/favorites/favoriteRecipesSlice';
import { favoriteArticlesReducer } from '../features/favorites/favoriteArticlesSlice';

export const store = configureStore({
    reducer:{
        recipes: recipesReducer,
        articles: articlesReducer,
        comments: commentsReducer,
        favRecipes: favoriteRecipesReducer,
        favArticles: favoriteArticlesReducer
    }
});