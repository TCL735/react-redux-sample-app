import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PersonInfo } from "../../types";
import { getBirthsOnThisDay } from "./api";

export interface BirthsOnThisDayState {
  persons: PersonInfo[];
  status: "ready" | "loading" | "error";
  errorMessage: string;
}

const initialState: BirthsOnThisDayState = {
  persons: [],
  status: "ready",
  errorMessage: "",
};

export const fetchBirths = createAsyncThunk("births/fetchBirths", async () => {
  const response = await getBirthsOnThisDay();
  return response;
});

export const birthsSlice = createSlice({
  name: "births",
  initialState,
  reducers: {
    clear: (state) => {
      state.persons = [];
      state.status = "ready";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBirths.pending, (state) => {
        state.status = "loading";
        state.errorMessage = "";
      })
      .addCase(fetchBirths.fulfilled, (state, action) => {
        if (action.payload.responseStatus.ok) {
          state.status = "ready";
          state.errorMessage = "";
        } else {
          state.status = "error";
          state.errorMessage = action.payload.responseStatus.statusText;
        }
        state.persons = action.payload.persons;
      })
      .addCase(fetchBirths.rejected, (state) => {
        state.status = "error";
        state.errorMessage = "Error";
        state.persons = [];
      });
  },
});

export const { clear } = birthsSlice.actions;

export const birthsReducer = birthsSlice.reducer;
