import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

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
        return data;
    }
)

export const postFavRecipes = createAsyncThunk(
    'favRecipes/fetchFavRecipes',
    async (payload) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };
        const response = await fetch(baseUrl + 'users/:userId', options)
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
)

const favoriteRecipesSlice = createSlice({
    name: 'favRecipes',
    initialState: { username: null, isLoading: true, errMess: null, favRecArr: []},
    reducers: {
        fave: (state, action) => {
            const newFav = action.payload;
            state.favRecArr.forEach((fav) => console.log(fav._id));
                const favPayload = {
                    username: state.username,
                    addFav: newFav
                };
                fetch(baseUrl + 'users/fave', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(favPayload),
                })
        },
        logged: (state, action) => {
            state.username = action.payload.username;
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
                    state.favRecArr = user.favoriteRecipes;
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

export const {fave} = favoriteRecipesSlice.actions;
export const { logged } = favoriteRecipesSlice.actions;
export const favoriteRecipesReducer = favoriteRecipesSlice.reducer;