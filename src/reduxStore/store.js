import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import inventoryReducer from './reduxSlice';
import inventorySaga from "./saga";

const saga = createSagaMiddleware();

export const store = configureStore({
    reducer:{
        inventory: inventoryReducer
    },
    middleware: () => [saga],
});
saga.run(inventorySaga);