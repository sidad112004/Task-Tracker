import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Detailtask from './components/detailtask/Detailtask'
import Createtask from './components/createtask/Createtask.jsx'
import Updateuser from './components/updateuser/Updateuser.jsx'
function App() {
  return (
    <>
    <Navbar/>
    {/* <Home/> */}
    {/* <Detailtask/> */}
    {/* <Createtask/> */}
    <Updateuser/>
    </>
  )
}



export default App