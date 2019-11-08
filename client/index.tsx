import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import App from './App'
import store from './store'
import history from './history'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.min.css'

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById('app')
)
