import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLinks = () => {
    return (
        <>
            <div className="border border-zinc-600 rounded-lg flex w-[98%] items-center h-[99%] text-zinc-300 ">
                <NavLink className={({ isActive }) => isActive ? "w-[50%] pt-1 lg:pb-0.5 rounded-l-lg h-full text-zinc-600 text-center" : "bg-zinc-700 w-[50%] rounded-l-lg text-center pt-1"} to={"/"}>Current Weather</NavLink>
                {/* <div className="border-r border-zinc-600 my-0.5"></div> */}
                <NavLink className={({ isActive }) => isActive ? "w-[50%] h-full pt-1 lg:pb-0.8 rounded-l-lg text-zinc-500 text-center" : "bg-zinc-700 w-[50%] rounded-r-lg text-center pt-1"} to={"/historical"}>Historical Weather</NavLink>
            </div>
        </>
    )
}

export default NavLinks
