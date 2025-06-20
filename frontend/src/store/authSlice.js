import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    role: null,
    userdata: null,
}

const authSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state, action) => {
           
            state.status = true;
            state.role = action.payload.role;
            state.userdata = action.payload;
        },
        logout:(state) => {
            state.status = false;
            state.role = null;
            state.userdata = null; 
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;