import { configureStore } from "@reduxjs/toolkit";
import { chanelsApi } from "./services";
import { authReducer } from "./reducres";

export const store = configureStore({
  reducer: {
    [chanelsApi.reducerPath]: chanelsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chanelsApi.middleware),
});