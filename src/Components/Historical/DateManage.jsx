import React, { useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { StoreContext } from "../Context";

const DateManage = () => {
  const { dateRange, setDateRange } = useContext(StoreContext);

  return (
    <>
      <div className="w-full text-white flex flex-col md:flex-row gap-4 px-4 md:px-8 pt-4 items-start md:items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full md:w-auto">
          <label className="text-sm md:text-base">Start Date:</label>
          <DatePicker
            selected={dateRange.start}
            onChange={(date) =>
              setDateRange((prev) => ({ ...prev, start: date }))
            }
            dateFormat="dd/MM/yyyy"
            className="w-full md:w-[75%] text-zinc-300 h-8 text-center border border-zinc-700 rounded-sm"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full md:w-auto">
          <label className="text-sm md:text-base">End Date:</label>
          <DatePicker
            selected={dateRange.end}
            onChange={(date) =>
              setDateRange((prev) => ({ ...prev, end: date }))
            }
            dateFormat="dd/MM/yyyy"
            className="w-full md:w-[75%] text-zinc-300 h-8 text-center border border-zinc-700 rounded-sm"
          />
        </div>
      </div>

      <span className="px-4 md:px-5 text-gray-400 text-sm block mt-2 md:mt-1">
        *Note: You can select a date range of up to 2 years in the past only.
      </span>
    </>
  );
};

export default DateManage;