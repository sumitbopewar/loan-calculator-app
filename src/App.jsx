import React, { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ErrorPage from './pages/Error/ErrorPage'
import About from './pages/About/About'
import ExchangeRates from './pages/ExchangeLiveRates/ExchangeRates'
import Home from './pages/Home/Home'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header'



function App() {

  const [darkMode, setDarkMode] = useState(false)
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <div className="app">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header check={darkMode} change={() => setDarkMode(!darkMode)} />
        <div className="childrens">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/rates' element={<ExchangeRates />} />
            <Route path='/about' element={<About />} />
            <Route path='/*' element={<ErrorPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default App
