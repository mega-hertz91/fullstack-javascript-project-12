import { createContext } from "react";

const authContext = createContext({
  token: null,
  isAuthenticated: true,
  username: '',
  login: () => {},
  logout: () => {},
});

export default authContext;