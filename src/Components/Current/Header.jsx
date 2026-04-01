import React, { useContext, memo } from 'react'
import DatePicker from 'react-datepicker'
import { StoreContext } from '../Context'
import "react-datepicker/dist/react-datepicker.css";

const Header = () => {
    const { handleDate, date, setDate } = useContext(StoreContext)

    return (
        <div className="w-full h-[10vh] text-white flex flex-col md:flex-row items-center gap-4 md:gap-25 px-4 md:px-8 pt-4">
            
            {/* Selected Date Text */}
            <div className="text-zinc-300 w-full md:w-auto text-center md:text-left">
                Selected: {handleDate}
            </div>

            {/* Date Picker */}
            <div className="w-full md:w-auto flex justify-center md:justify-start items-center">
                <span className='text-lg pr-2 text-zinc-400'>
                    Select:
                </span>

                <DatePicker
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    placeholderText='Choose your date'
                    onChange={setDate}
                    className='w-full md:w-[75%] text-zinc-300 h-8 text-center border border-zinc-700 rounded-sm'
                />
            </div>
        </div>
    )
}

export default memo(Header)