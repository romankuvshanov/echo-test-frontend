import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/token/tokenSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});
