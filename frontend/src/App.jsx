import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, LoginPage, NotFoundPage } from './components/pages';

const routes = [
  {
    path: '',
    index: true,
    element: <MainPage />
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  
  // 404 page should be the last route
  {
    path: '*',
    element: <NotFoundPage />
  }
]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => <Route key={index} {...route} />)}
      </Routes>
    </BrowserRouter>
  );
}

export default App
