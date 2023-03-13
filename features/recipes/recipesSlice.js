import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async () => {
        const response = await fetch(baseUrl + 'recipes');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

export const postComment = createAsyncThunk(
    'recipes/postComment',
    async (payload) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };
        console.log('body',options.body);
        const response = await fetch(baseUrl + `recipes/:recipeId/comments`, options);
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: { isLoading: true, errMess: null, recipesArray: [] },
    reducers: {},
    extraReducers: {
        [fetchRecipes.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchRecipes.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.recipesArray = action.payload;
        },
        [fetchRecipes.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error
                ? action.error.message
                : 'Fetch failed';
        },
        [postComment.pending]: (state) => {
            state.isLoading = true;
        },
        [postComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.recipesArray = action.payload;
        },
        [postComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }
});

export const recipesReducer = recipesSlice.reducer;
