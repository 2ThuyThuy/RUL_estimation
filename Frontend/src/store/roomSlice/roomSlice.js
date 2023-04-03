import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import RoomService from "../../services/room.service";
// import { userAPI } from "./userAPI";

const roomService = new RoomService();

// First, create the thunk
export const fetchGetRooms = createAsyncThunk("/rooms", async (thunkAPI) => {
  const response = await roomService.getRooms();
  return response.data;
});

export const fetchRegister = createAsyncThunk(
  "room/register",
  async (roomCredentialDto, thunkAPI) => {
    const response = await roomService.register(roomCredentialDto);
    return response.data;
  }
);

const initialState = {
  entities: [],
  loading: "idle",
};

// Then, handle actions in your reducers:
const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
});

export default roomSlice.reducer;
