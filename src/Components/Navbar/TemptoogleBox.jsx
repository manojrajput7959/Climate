import React, { useContext } from 'react'
import { StoreContext } from '../Context'

const TemptoogleBox = () => {
    const { tempToggle, celsius } = useContext(StoreContext)

    return (
        <div className="text-white flex justify-center sm:justify-start w-full sm:w-auto">
            <div 
                onClick={tempToggle} 
                className="w-3/5 sm:w-[58%] max-w-[100px] cursor-pointer pl-2 py-0.5 rounded-lg gap-2 flex border border-zinc-600 justify-center sm:justify-start"
            >
                <div className="text-lg text-zinc-500 flex items-center">
                    <i className="ri-temp-hot-line"></i>
                </div>
                <div className="text-lg text-zinc-300 flex items-center">°{celsius}</div>
            </div>
        </div>
    )
}

export default TemptoogleBox