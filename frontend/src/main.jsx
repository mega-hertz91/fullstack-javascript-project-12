import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { store } from './store'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import i18n from './i18n'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider
        breakpoints={['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="sm"
      >
        <I18nextProvider i18n={i18n} defaultNS={('translation')}>
          <App />
          <ToastContainer />
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)