import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from '../features/recipes/recipesSlice';
import { articlesReducer } from '../features/articles/articlesSlice';
import { favoriteRecipesReducer } from '../features/favorites/favoriteRecipesSlice';
import { favoriteArticlesReducer } from '../features/favorites/favoriteArticlesSlice';
import { usersReducer } from '../features/users.js/usersSlice';
import {
    persistStore,
    persistCombineReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
};

export const store = configureStore({
    reducer: persistCombineReducers(config, {
        recipes: recipesReducer,
        articles: articlesReducer,
        favRecipes: favoriteRecipesReducer,
        favArticles: favoriteArticlesReducer,
        users: usersReducer
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        })
});

export const persistor = persistStore(store);