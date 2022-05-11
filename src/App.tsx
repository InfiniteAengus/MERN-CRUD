import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import AddItem from './pages/AddItem'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add-item' element={<AddItem />} />
    </Routes>
  )
}

export default App
