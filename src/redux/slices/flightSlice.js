import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "../actions";

const initialState = {
  isLoading: false,
  isError: false,
  flights: [],
  path: [],
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.path = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFlights.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFlights.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getFlights.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.flights = action.payload;
    });
  },
});

export const { setPath } = flightSlice.actions;

export default flightSlice.reducer;
