import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

export const alertAdapter = createEntityAdapter({
  selectId: alert => alert.id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
})

const initialState = alertAdapter.getInitialState()

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: alertAdapter.addOne,
    removeAlert: alertAdapter.removeOne,
  },
})

export const { addAlert, removeAlert } = alertSlice.actions
export const selectors = alertAdapter.getSelectors(state => state.alerts)

export default alertSlice.reducer
