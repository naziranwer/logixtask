import React, { useState } from "react";

const Calendar = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);
    setSelectedDate(selected);
    onSelectDate(selected); 
  };

  return (
    <div className="calendar flex flex-col items-center mt-8">
      <h2 className="text-xl font-semibold mb-4">Select Date:</h2>
      <input
        type="date"
        value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
        onChange={handleDateChange}
        className="p-2 border rounded focus:outline-none focus:border-blue-500 cursor-pointer"
      />
    </div>
  );
};

export default Calendar;
