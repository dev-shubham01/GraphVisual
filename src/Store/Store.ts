// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import graphReducer from "./graphSlice";


// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

// Define the app dispatch type
export type AppDispatch = typeof store.dispatch;

// Create the Redux store
export const store = configureStore({
  reducer: {
    graph: graphReducer,
 
  },
});
