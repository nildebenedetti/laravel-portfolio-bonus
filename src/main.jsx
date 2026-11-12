import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './styles/index.css'


import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <SpeedInsights />
  </StrictMode>,
)
