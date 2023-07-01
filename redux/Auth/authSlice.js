import { createSlice } from "@reduxjs/toolkit";
import { authInitialState } from "./initialState";
import { registerAuthThunk, logInAuthThunk, logOutAuthThunk } from "./thunks";

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.email = "";
      state.userName = "";
      state.token = "";
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type === registerAuthThunk.fulfilled.type ||
          action.type === logInAuthThunk.fulfilled.type,
        (state, action) => {
          state.email = action.payload.email;
          state.userName = action.payload.userName;
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(
        (action) => action.type === logOutAuthThunk.fulfilled.type,
        (state) => {
          state.email = "";
          state.userName = "";
          state.token = "";
          state.isLoggedIn = false;
        }
      );
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
