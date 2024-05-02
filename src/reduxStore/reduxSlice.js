import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    inventoryItems:[],
    isLoading: false,
    isFallback: false,
    getItem:[],
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
            state.error.status = 200;
            state.error.msg = "";
        },
        getInventoryFailure:(state,action) => {
            state.error.msg = action.payload;
            state.error.status = 500;
            state.isLoading = false;
        },
        getFallBackData:(state) => {
            state.isLoading = true;
        },
        addItemApiCall:(state) => {
            state.isLoading = true;
        },
        getItemApiCall:(state) => {
            state.isLoading = true;
        },
        getItemSuccess:(state,action) => {
            state.getItem = action.payload;
            state.isLoading = false;
            state.error.status = 200;
            state.error.msg = "";
        },
        updateItemApiCall:(state) => {
            state.isLoading = true;
        }
    }    
})

export const {getInventoryFetch,getInventorySuccess,getInventoryFailure,
    getFallBackData,addItemApiCall,getItemApiCall,getItemSuccess,updateItemApiCall} = inventorySlice.actions;

export default inventorySlice.reducer;