import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './providers/AuthProvider.jsx'
import ThemeProvider from "react-bootstrap/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg"]}
        minBreakpoint="lg"
      >
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
