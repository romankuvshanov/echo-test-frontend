import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import tokenReducer from "../features/token/tokenSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    token: tokenReducer,
  },
});
