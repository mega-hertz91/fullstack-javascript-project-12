import { configureStore } from '@reduxjs/toolkit'
import { authReducer, alertReducer } from './reducres'
import { chanelsApi, messagesApi } from './services'

export const store = configureStore({
  reducer: {
    [chanelsApi.reducerPath]: chanelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    auth: authReducer,
    alerts: alertReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(chanelsApi.middleware)
      .concat(messagesApi.middleware),
})
