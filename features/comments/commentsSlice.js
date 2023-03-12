import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const response = await fetch(baseUrl + 'comments');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

// export const postComment = createAsyncThunk(
//     'comments/postComment',
//     async (payload, { dispatch, getState }) => {
//         console.log(payload);
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload),
//         };
//         const response = await fetch(baseUrl + `recipes/:recipeId/comments`, options);
//         if (!response.ok) {
//             return Promise.reject(
//                 'Unable to fetch, status: ' + response.status
//             );
//         }
//         const data = await response.json();
//         return data;
//     }
// )

const commentsSlice = createSlice({
    name: 'comments',
    initialState: { isLoading: true, errMess: null, commentsArray: [] },
    reducers: {
        addComment: (state, action) => {
            console.log(action.payload);
            // console.log(postComment(action.payload));
        }
    },
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.commentsArray = action.payload;
        },
        [fetchComments.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }
});

export const { addComment } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
