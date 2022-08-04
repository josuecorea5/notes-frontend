import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { NoteProvider } from '../src/noteContext/index'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoteProvider>
      <App />
    </NoteProvider>
  </React.StrictMode>
)
