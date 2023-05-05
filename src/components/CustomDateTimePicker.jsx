import React, { useState, useEffect, useRef } from 'react';

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

const CustomDateTimePicker = ({ value, onChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateValue, setDateValue] = useState(value || new Date());
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateChange = (day) => {
    const newDate = new Date(dateValue);
    newDate.setDate(day);
    setDateValue(newDate);
    onChange(newDate);
  };

  const handleTimeChange = (event) => {
    const [hours, minutes] = event.target.value.split(':');
    const newDate = new Date(dateValue);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    setDateValue(newDate);
    onChange(newDate);
  };

  const renderCalendar = () => {
    const month = dateValue.getMonth();
    const year = dateValue.getFullYear();
    const days = daysInMonth(month + 1, year);

    const daysArray = [];
    for (let i = 1; i <= days; i++) {
      daysArray.push(i);
    }

    return (
      <div ref={calendarRef} className="bg-black p-2 absolute z-10 border border-gray-700 rounded-lg">
        {daysArray.map((day) => (
          <button
            key={day}
            className={`w-8 h-8 inline-flex items-center justify-center ${
              day === dateValue.getDate() ? 'bg-teal-500 text-white' : 'text-white'
            }`}
            onClick={() => handleDateChange(day)}
          >
            {day}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      <input
        type="text"
        readOnly
        value={dateValue.toLocaleDateString()}
        onClick={() => setShowCalendar(!showCalendar)}
        className="cursor-pointer w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 bg-black text-white"
      />
      {showCalendar && renderCalendar()}
      <input
        type="time"
        value={dateValue.toTimeString().substring(0, 5)}
        onChange={handleTimeChange}
        className="w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 bg-black text-white mt-4"
      />
    </div>
  );
};

export default CustomDateTimePicker;
