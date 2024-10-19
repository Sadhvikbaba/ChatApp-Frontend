import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: null,
    onlineUsers : null,
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        login: (state, action) => {
            let temp = action.payload
            if(temp){
                state.users = temp
            }
        },
        setOnlineUsers: (state, action) => {
            let temp = action.payload
            if(temp){
                state.onlineUsers = temp
            }
        },
        logout: (state) => {
            state.users = null;
        }
     }
})

export const {login, logout ,setOnlineUsers } = userSlice.actions;

export default userSlice.reducer;