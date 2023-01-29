import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
    async () => {
        const response = await fetch(baseUrl + 'articles');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch. status: ' + response.status
            );
        }
        const data = response.json();
        return data;
    }
);

const articlesSlice = createSlice({
    name: 'articles',
    initialState: { isLoading: true, errMess: null, articlesArray: [] },
    reducers: {},
    extraReducers: {
        [fetchArticles.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchArticles.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.articlesArray = action.payload;
        },
        [fetchArticles.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error
                ? action.error.message
                : 'fetch failed';
        }
    }
});

export const articlesReducer = articlesSlice.reducer;