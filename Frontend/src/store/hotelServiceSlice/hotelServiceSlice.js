import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AuthService from "../../services/auth.service";
// import { userAPI } from "./userAPI";

const authService = new AuthService();

// First, create the thunk
export const fetchLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    const response = await authService.login({ username, password });
    return response.data;
  }
);

const initialState = {
  entities: [],
  loading: "idle",
};

// Then, handle actions in your reducers:
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder.addCase(fetchLogin.fulfilled, (state, action) => {
  //       state.entities.push(action.payload);
  //     });
  //   },
});

export default authSlice.reducer;
