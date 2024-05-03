import React from 'react'
import ReactDOM from 'react-dom/client'

// import './assets/styles/index.css'
import '@fontsource/poppins'

import { AppRouter } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
