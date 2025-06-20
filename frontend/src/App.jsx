import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login.jsx'

function App() {
  return (
    <>
     <Navbar/>
     <Routing/>
    </>
  )
}

export function Routing() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/login',
          element: <Login />
        }
      ]
    }
  ])

}


export default App