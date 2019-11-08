import React from 'react'
import Routes from './Routes'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div id="root">
      <ToastContainer />
      <Routes />
    </div>
  )
}

export default App
