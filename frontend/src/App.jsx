import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, LoginPage } from './components/pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
