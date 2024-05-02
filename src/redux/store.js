import { configureStore } from "@reduxjs/toolkit";
import flight from "./slices/flightSlice";

export default configureStore({
  reducer: { flight },
});
