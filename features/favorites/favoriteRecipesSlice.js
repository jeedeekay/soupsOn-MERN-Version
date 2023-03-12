import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';
import * as SecureStore from 'expo-secure-store';

export const fetchFavRecipes = createAsyncThunk(
    'favRecipes/fetchFavRecipes',
    async () => {
        const response = await fetch(baseUrl + 'users/:userId')
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        console.log('res', data);
        return data;
    }
)

const favoriteRecipesSlice = createSlice({
    name: 'favRecipes',
    initialState: { username: null, isLoading: true, errMess: null, favRecArr: []},
    reducers: {
        toggleFavorite: (favRecipes, action) => {
            if (favRecipes.includes(action.payload)) {
                return favRecipes.filter((favorite) => favorite !== action.payload);
            } else {
                favRecipes.push(action.payload);
                console.log(favRecipes);
            }
        },
        logged: (state, action) => {
            // console.log('user', action.payload.username);
            state.username = action.payload.username;
            console.log('user', state.username);
            // SecureStore.getItemAsync('userinfo').then((userdata) => {
            //     const userinfo = JSON.parse(userdata);
            //     console.log('user', userinfo);
            // })
        }
    },
    extraReducers: {
        [fetchFavRecipes.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchFavRecipes.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            action.payload.filter((user) => {
                if (user.username === state.username) {
                    console.log(user.favoriteRecipes);
                    state.favRecArr = user.favoriteRecipes;
                    console.log('user favorite recipes:',state.favRecArr);
                }
            })
        },
        [fetchFavRecipes.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }
});

export const { logged } = favoriteRecipesSlice.actions;
export const { toggleFavorite } = favoriteRecipesSlice.actions;
export const favoriteRecipesReducer = favoriteRecipesSlice.reducer;