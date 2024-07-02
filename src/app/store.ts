import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { birthsReducer } from "../features/onThisDay/birthsSlice";

export const store = configureStore({
  reducer: {
    births: birthsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
