import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import Home from './pages/Home'

const App = () => {
  return (
    <AnimatePresence>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  )
}

export default App