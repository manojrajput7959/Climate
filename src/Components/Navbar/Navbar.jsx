import React from 'react'
import NavLinks from './NavLinks'
import TemptoogleBox from './TemptoogleBox'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex flex-wrap md:flex-nowrap w-full pb-3 pt-4 px-3 border-b border-zinc-700 items-center">
      {/* Logo */}
      <NavLink 
        to={"/"} 
        className="w-full sm:w-[60%] text-white text-2xl mb-2 sm:mb-0"
      >
        SkyCast
      </NavLink>

      {/* Navigation Links */}
      <div className="w-full sm:w-[25%] mb-2 sm:mb-0">
        <NavLinks />
      </div>

      {/* Divider */}
      <div className="hidden sm:block border-r border-zinc-700 mb-1 mt-1"></div>

      {/* Temperature Toggle */}
      <div className="w-full sm:w-[10%] pl-0 sm:pl-3">
        <TemptoogleBox />
      </div>
    </div>
  )
}

export default Navbar