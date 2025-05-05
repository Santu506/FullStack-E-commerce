import React from 'react'
import {assets} from '../../assets/admin_assets/assets'
import './Navbar.css'

function Navbar({setToken}) {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo2} alt="" />
        <button onClick={()=>setToken('')}>Logout</button>
    </div>
  )
}

export default Navbar
