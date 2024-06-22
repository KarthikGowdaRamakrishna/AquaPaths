import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const UserSlice = createSlice({
    name: "users",
    initialState: {
        loading: 'idle',
        userData: {},
        error:false,
        errorMessage:{}
    },
    reducers: {
        usersLoggingIn(state) {
            if(state.loading === 'idle') {
                state.loading = 'pending'
                state.error = false
                state.errorMessage = {}
            }
        },
        loginUserError(state,action:PayloadAction<{}>){
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.error = true
                state.errorMessage = action.payload
            }
        },
        signOutUser(state){
                console.log("reached");
                state.loading = 'idle'
                state.error = false
                state.userData = {}
        },
        loginUser(state,action:PayloadAction<{}>){
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.userData = action.payload
            }
        },
        saveUserRoute(state,action:PayloadAction<{}>){
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.userData = action.payload
            }
        },
    }
})

export const { usersLoggingIn, loginUser,loginUserError, saveUserRoute,signOutUser } = UserSlice.actions
export default UserSlice.reducer