import { configureStore } from "@reduxjs/toolkit"
import postReducer from "./createPost"
import appSlice from "./app"

export const AppStore = configureStore({
    reducer: {
        main: appSlice,
        createPost: postReducer,
    },
})
