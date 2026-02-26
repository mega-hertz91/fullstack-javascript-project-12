import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducres";
import { chanelsApi } from "./services";
import { messagesApi } from "./services";

export const store = configureStore({
  reducer: {
    [chanelsApi.reducerPath]: chanelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(chanelsApi.middleware)
      .concat(messagesApi.middleware),
});
