import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainPage, LoginPage, NotFoundPage, SignUpPage } from './components/pages'
import { useSelector } from 'react-redux'

const routes = [
  {
    path: '',
    index: true,
    element: <MainPage />,
    private: true,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'signup',
    element: <SignUpPage />,
  },
]

const App = () => {
  const { isAuth } = useSelector(state => state.auth)

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ private: isPrivate = false, ...route }, index) => {
          // Если маршрут приватный и пользователь не аутентифицирован, перенаправляем на страницу логина
          if (isPrivate && !isAuth) {
            return (
              <Route
                key={index}
                path={route.path}
                element={<Navigate to="/login" replace />}
              />
            )
          }

          // Если маршрут публичный и пользователь уже аутентифицирован, перенаправляем на главную страницу
          if (!isPrivate && isAuth) {
            return (
              <Route
                key={index}
                path={route.path}
                element={<Navigate to="/" replace />}
              />
            )
          }

          return <Route key={index} {...route} />
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
