import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import userSlice from "./users.js";
import chatSlice from "./selectedChat.js"

const store = configureStore({
    reducer: {
        auth : authSlice,
        users : userSlice,
        chat : chatSlice
    }
});


export default store;