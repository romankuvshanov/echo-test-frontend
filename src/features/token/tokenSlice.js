import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    update: (state, action) => {
      state.token = action.payload;
    },
    clear: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
});

export const selectToken = (state) => state.token.token;

export const { update, clear } = tokenSlice.actions;

export default tokenSlice.reducer;
