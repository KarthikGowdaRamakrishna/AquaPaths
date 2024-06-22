import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import thunk from 'redux-thunk';
import userReducer from "./features/userSlice";
import portReducer from "./features/portSlice";
import newsReducer from "./features/newsSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        port: portReducer,
        news: newsReducer,
    },
    // middleware: [...getDefaultMiddleware(), thunk]
});

// Define a typed version of useSelector hook
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
