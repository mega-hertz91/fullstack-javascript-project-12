import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainPage, LoginPage, NotFoundPage } from './components/pages';
import { useContext } from 'react';
import { AuthContext } from './context';

const routes = [
  {
    path: "",
    index: true,
    element: <MainPage />,
    private: true,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
];

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ private: isPrivate = false, ...route }, index) => {
          // Если маршрут приватный и пользователь не аутентифицирован, перенаправляем на страницу логина
          if (isPrivate && !isAuthenticated) {
            return (
              <Route
                key={index}
                path={route.path}
                element={<Navigate to="/login" replace />}
              />
            );
          }

          // Если маршрут публичный и пользователь уже аутентифицирован, перенаправляем на главную страницу
          if (!isPrivate && isAuthenticated) {
            return (
              <Route
                key={index}
                path={route.path}
                element={<Navigate to="/" replace />}
              />
            );
          }

          return <Route key={index} {...route} />;
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
