import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PersonBirthPage } from "../../types";
import { getBirthsOnThisDay } from "./api";

export interface BirthsOnThisDayState {
  persons: PersonBirthPage[];
  status: "ready" | "loading" | "error";
}

const initialState: BirthsOnThisDayState = {
  persons: [],
  status: "ready",
};

export const fetchBirths = createAsyncThunk("births/fetchBirths", async () => {
  const response = await getBirthsOnThisDay();
  return response;
});

export const birthsSlice = createSlice({
  name: "births",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBirths.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBirths.fulfilled, (state, action) => {
        state.status = "ready";
        state.persons = action.payload;
      })
      .addCase(fetchBirths.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const birthsReducer = birthsSlice.reducer;
