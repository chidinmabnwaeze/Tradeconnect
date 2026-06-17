 import './App.css'
 import {BrowserRouter, Routes, Route} from 'react-router-dom'
 import { Star } from 'lucide-react'
 import Register from './pages/register'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={ <div className="flex flex-col items-center justify-center h-screen w-screen"> <Star className="text-primary w-screen h-100" /> <h1 className="text-2xl font-bold text-primary">Welcome to Trade Connect</h1> </div> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

