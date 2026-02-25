import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseStatus } from "../../constants";

const Status = {
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
  IDLE: "idle",
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    const response = await fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return data;
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async logout (e.g., API call)
});

const token = localStorage.getItem("authToken");
const userName = localStorage.getItem("authUsername");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: !!token,
    username: userName || null,
    state: Status.IDLE, // idle | loading | succeeded | failed
    token: token || null,
  },
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUser(state, action) {
      state.username = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.state = Status.LOADING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { statusCode, token = null, username = null } = action.payload;

      if (statusCode > ResponseStatus.OK) {
        state.state = Status.ERROR;

        throw new Error("Login or password is incorrect");
      }

      state.isAuth = true;
      state.username = username;
      state.token = token;
      state.state = Status.SUCCESS;

      localStorage.setItem("authToken", token);
      localStorage.setItem("authUsername", username);
    });
    builder.addCase(login.rejected, (state) => {
      state.state = Status.ERROR;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuth = false;
      state.username = null;
      state.token = null;
      state.state = Status.IDLE;

      localStorage.removeItem("authToken");
      localStorage.removeItem("authUsername");
    });
  },
});

export const { setAuth, setUser, setToken } = authSlice.actions;
export const selectors = authSlice.getSelectors((state) => state.auth);

export default authSlice.reducer;
