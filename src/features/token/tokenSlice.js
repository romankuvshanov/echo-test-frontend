import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    update: (state, action) => {
      state.token = action.payload;
    },
    clear: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectToken = (state) => state.token.token;

export const { update, clear } = tokenSlice.actions;

export default tokenSlice.reducer;
