import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from "react-router-dom"
import { LoginContextProvider } from "./contexts/loginContext"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <LoginContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </LoginContextProvider>
    </Router>
  </React.StrictMode>,
)
