import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chat : null ,
    messages : []
}

const chatSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        selectChat: (state, action) => {
            let temp = action.payload
            if(temp){
            state.chat = temp
            }
        },
        allMessages: (state, action) => {
            let temp = action.payload
            if(temp){
            state.messages = temp
            }else{state.messages = []}
        },
        addMessage: (state, action) => {
            let temp = action.payload
            if(temp && (state.chat?._id == temp.senderId || state.chat?._id == temp.recieverId)){
            state.messages = [...state.messages ,temp]
            }
        },
     }
})

export const {selectChat , addMessage , allMessages} = chatSlice.actions;

export default chatSlice.reducer;