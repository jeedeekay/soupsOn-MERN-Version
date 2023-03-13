import { createSlice } from '@reduxjs/toolkit';

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
                state.loggedIn = false;
                loginCheck();
            }
        }
    }
});

export const { logout } = usersSlice.actions;
export const { setLoginStatus } = usersSlice.actions;
export const { loginCheck } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
