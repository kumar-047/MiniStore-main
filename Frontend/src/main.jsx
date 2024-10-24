import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from './Store.js'
import { Provider } from 'react-redux'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
 <StrictMode>
    <App />
    <ToastContainer />
  </StrictMode>
  </Provider>
 
)
