import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

// export const loginUser = createAsyncThunk(
//     'comments/loginUser',
//     async () => {
//         const response = await fetch(baseUrl + 'users');
//         if (!response.ok) {
//             return Promise.reject(
//                 'Unable to fetch, status: ' + response.status
//             );
//         }
//         const data = await response.json();
//         return data;
//     }
// );

// export const registerUser = createAsyncThunk(
//     'comments/registerUser',
//     async (payload, { dispatch, getState }) => {
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: payload,
//         };
//         const response = await fetch(baseUrl + 'users', options);
//         if (!response.ok) {
//             return Promise.reject(
//                 'Unable to fetch, status: ' + response.status
//             );
//         }
//         const data = await response.json();
//         return data;
//         // setTimeout(() => {
//         //     const { comments } = getState();
//         //     payload.date = new Date().toISOString();
//         //     payload.id = comments.commentsArray.length;
//         //     dispatch(addComment(payload));
//         // }, 2000)
//     }
// )

const usersSlice = createSlice({
    name: 'users',
    initialState: {loggedIn: false},
    reducers: {
        loginCheck: (state, action) => {
            if (state.loggedIn === true) {
                console.log(true);
            } else {
                console.log(false);
            }
        },
        setLoginStatus: (state, action) => {
            if (action.type === 'users/setLoginStatus') {
                console.log('loggin in');
                state.loggedIn = true;
              }
        },
        logout: (state, action) => {
            if (action.type === 'users/logout') {
                console.log('logging out');
                state.loggedIn = false;
                loginCheck();
            }
        }
    }
    // extraReducers: {
    //     [loginUser.pending]: (state) => {
    //         state.isLoading = true;
    //     },
    //     [loginUser.fulfilled]: (state, action) => {
    //         state.isLoading = false;
    //         state.errMess = null;
    //         state.commentsArray = action.payload;
    //     },
    //     [loginUser.rejected]: (state, action) => {
    //         state.isLoading = false;
    //         state.errMess = action.error
    //             ? action.error.message
    //             : 'Fetch failed';
    //     }
    // }
});

export const { logout } = usersSlice.actions;
export const { setLoginStatus } = usersSlice.actions;
export const { loginCheck } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
