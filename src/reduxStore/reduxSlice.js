import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    inventoryItems:[],
    isLoading: false,
    isFallback: false,
    error:{
        status:200,
        msg:"",
    },
}

export const inventorySlice = createSlice({
    name:"inventoryReducer",
    initialState,
    reducers:{
        getInventoryFetch:(state) => {
            state.isLoading = true;
        },
        getInventorySuccess:(state,action) => {
            state.inventoryItems = action.payload;
            state.isFallback = action.payload.isFallback;
            state.isLoading = false;
        },
        getInventoryFailure:(state,action) => {
            state.error.msg = action.payload;
            state.error.status = 500;
            state.isLoading = false;
        }
    }    
})

export const {getInventoryFetch,getInventorySuccess,getInventoryFailure} = inventorySlice.actions;

export default inventorySlice.reducer;