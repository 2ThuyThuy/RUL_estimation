import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AuthService from "../../services/auth.service";
// import { userAPI } from "./userAPI";

const authService = new AuthService();

// First, create the thunk
export const fetchLogin = createAsyncThunk(
  "auth/login",
  async (authCredentialDto, thunkAPI) => {
    const response = await authService.login(authCredentialDto);
    return response.data;
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/register",
  async (authCredentialDto, thunkAPI) => {
    const response = await authService.register(authCredentialDto);
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
});

export default authSlice.reducer;
