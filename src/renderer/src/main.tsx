import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './style/entry.css'

createRoot(document.getElementById('root')!).render(
  <App />
)
