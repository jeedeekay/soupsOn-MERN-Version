import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';
import * as SecureStore from 'expo-secure-store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

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

export const postFavRecipes = createAsyncThunk(
    'favRecipes/fetchFavRecipes',
    async (payload, { dispatch, getState }) => {
        dispatch(refreshRecipes(payload));
        console.log('in post',payload);
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
        console.log('res', data);
        return data;
    }
)

const favoriteRecipesSlice = createSlice({
    name: 'favRecipes',
    initialState: { username: null, isLoading: true, errMess: null, favRecArr: []},
    reducers: {
        toggleFavorite: (state, favRecipes, action) => {
            console.log('fav clicked', action.type);
            // if (state.favRecArr.includes(action.payload)) {
            //     return state.favRecArr.filter((favorite) => favorite !== action.payload);
            // } else {
            //     postFavRecipes({username: state.username})
            //     // favRecipes.push(action.payload);
            //     // console.log(favRecipes);
            // }
        },
        toFav: (state, action) => {
            console.log(action.type, action.payload);
            const newFav = action.payload;
            console.log(state.favRecArr);
            state.favRecArr.forEach((fav) => console.log(fav._id));
            if (state.favRecArr.find((fav) => fav._id !== newFav)) {
                console.log('new fav');
                const favPayload = {
                    username: state.username,
                    addFav: newFav
                };
                fetch(baseUrl + 'users/:userId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(favPayload),
                })
            } else {
                console.log('already fav');
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
        },
        toHeader: (state, action) => {
            return state.username;
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
                console.log('fav rec user',user)
                if (user.username === state.username) {
                    // console.log(user.favoriteRecipes);
                    state.favRecArr = user.favoriteRecipes;
                    // console.log('user favorite recipes:',state.favRecArr);
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

export const {toFav} =favoriteRecipesSlice.actions;
export const { toHeader } =favoriteRecipesSlice.actions;
export const { logged } = favoriteRecipesSlice.actions;
export const { toggleFavorite } = favoriteRecipesSlice.actions;
export const favoriteRecipesReducer = favoriteRecipesSlice.reducer;