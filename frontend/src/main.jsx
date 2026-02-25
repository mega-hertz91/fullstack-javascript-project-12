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
        breakpoints={["xxxl", "xxl", "xl", "lg"]}
        minBreakpoint="lg"
      >
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
