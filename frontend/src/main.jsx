import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import App from './App.jsx'
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { store } from "./store";
import { Provider } from "react-redux"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider
        breakpoints={["xxl", "xl", "lg", "md", "sm"]}
        minBreakpoint="sm"
      >
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
