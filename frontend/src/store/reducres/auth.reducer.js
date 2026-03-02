import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseStatus } from "@/constants";
import { RequestError } from "@/errors/";

const Status = {
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
  IDLE: "idle",
};

/**
 * Login and logout thunks. You can also add register thunk here if you want to implement registration in your app.
 */
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      throw new RequestError(
        error.message + " Please check your internet connection and try again",
      );
    }
  },
);

/**
 * Logout thunk. In a real app, you might want to call an API endpoint to invalidate the token on the server side.
 */
export const logout = createAsyncThunk("auth/logout", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call delay
});

/**
 * Sign up thunk. You can implement it similarly to login, just call the appropriate API endpoint and handle the response.
 */
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ username, password }) => {
    try {
      const response = await fetch("/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      throw new RequestError(
        error.message + " Please check your internet connection and try again",
      );
    }
  },
);

const loginScenarios = (state, { username, token }) => {
  state.isAuth = true;
  state.username = username;
  state.token = token;

  localStorage.setItem("authToken", token);
  localStorage.setItem("authUsername", username);
};

const logoutScenarios = (state) => {
  state.isAuth = false;
  state.username = null;
  state.token = null;

  localStorage.removeItem("authToken");
  localStorage.removeItem("authUsername");
};

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
    /**
     * Login and logout scenarios
     */
    builder.addCase(login.pending, (state) => {
      state.state = Status.LOADING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { statusCode, token = null, username = null } = action.payload;

      if (statusCode > ResponseStatus.OK) {
        state.state = Status.ERROR;

        throw new RequestError("Login or password is incorrect", statusCode);
      }

      loginScenarios(state, { token, username });
      state.state = Status.SUCCESS;
    });
    builder.addCase(login.rejected, (state) => {
      state.state = Status.ERROR;
    });
    /**
     * Logout scenarios. In a real app, you might want to handle different cases (e.g., logout success, logout failure) based on the API response. Here we just simulate a successful logout after a delay.
     */
    builder.addCase(logout.fulfilled, (state) => {
      logoutScenarios(state);
      state.state = Status.SUCCESS;
    });
    /**
     * Sign up scenarios. You can implement it similarly to login, just call the appropriate API endpoint and handle the response. Here we assume that the API returns the same response structure as login (with statusCode, token, and username) for simplicity. In a real app, you might want to adjust this based on your API design.
     */
    builder.addCase(signUp.pending, (state) => {
      state.state = Status.LOADING;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      const { statusCode, token = null, username = null } = action.payload;

      if (statusCode > ResponseStatus.OK) {
        state.state = Status.ERROR;

        throw new RequestError("User alredy exist", statusCode);
      }

      loginScenarios(state, { token, username });
      state.state = Status.SUCCESS;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.state = Status.ERROR;
    });
  },
});

export const { setAuth, setUser, setToken } = authSlice.actions;
export const selectors = authSlice.getSelectors((state) => state.auth);

export default authSlice.reducer;
