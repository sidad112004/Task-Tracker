import React from 'react'
import Logout from './Logout'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status)
  const role = useSelector((state) => state.auth.role)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: authStatus
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'Create Task',
      slug: '/createtask',
      active: authStatus && role === 'USER'
    },
    {
      name: 'Update User',
      slug: '/updateuser',
      active: authStatus && role === 'ADMIN'
    }
    // You can add more role-specific items here if needed
  ]

  return (
    <nav>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button onClick={() => navigate(item.slug)}>{item.name}</button>
                    </li>
                  )
              )}
            </ul>
          </div>
          <button className="btn btn-ghost text-xl" onClick={() => navigate('/')}>
            Task-Tracker
          </button>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button onClick={() => navigate(item.slug)}>{item.name}</button>
                  </li>
                )
            )}
          </ul>
        </div>

        <div className="navbar-end">
          {authStatus && <Logout />}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
