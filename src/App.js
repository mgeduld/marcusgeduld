import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { GlobalStyles } from './styles/gobal'
import { Header } from './header'
import { Routes } from './routes'

export const App = () => {
  return (
    <div className="app">
      <GlobalStyles />
      <Router>
        <Header />
        <Routes />
      </Router>
    </div>
  )
}
