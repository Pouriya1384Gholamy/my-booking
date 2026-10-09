import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Reservation from './Pages/Reservation/Reservation'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reservation" element={<Reservation />} />
    </Routes>
  )
}

export default App