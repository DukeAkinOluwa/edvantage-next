'use client'

import React, { useState } from 'react';
import task_info from "../../DB/taskdata.json"
import CalTaskTemplate from './CalTaskTemplate';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DashboardCalendar = () => {
  const taskinfo = task_info.todaystasks
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarViewDate, setCalenderViewDate] = useState(new Date());

  const getDaysInMonth = () => {
    const year = calendarViewDate.getFullYear();
    const month = calendarViewDate.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const daysInMonth = [];
    for (let i = 1; i <= lastDay; i++) {
      daysInMonth.push(i);
    }

    const daysBefore = Array(firstDayOfWeek).fill(null);
    const daysAfter = Array(6 - (lastDay + firstDayOfWeek) % 7).fill(null);

    return [...daysBefore, ...daysInMonth, ...daysAfter];
  };

  const handleDateClick = (day) => {
    const newDate = new Date(calendarViewDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
  };

  const isCurrentDay = (day) => {
    const today = new Date();
    return (
      calendarViewDate.getMonth() === today.getMonth() &&
      calendarViewDate.getFullYear() === today.getFullYear() &&
      day === today.getDate()
    );
  };
  const isSelectedDay = (day) => {
    return (
      calendarViewDate.getMonth() === selectedDate.getMonth() &&
      calendarViewDate.getFullYear() === selectedDate.getFullYear() &&
      day === selectedDate.getDate()
    );
  };

  return (
    <div className="dashboard-calendar">
      <div className="box">
        <div className="dashboard-section-header calendar-header">
            <h3>Calendar</h3>
            <div className="month-info">
              <h4>{new Intl.DateTimeFormat('en-UK', { month: 'long', year: 'numeric' }).format(calendarViewDate)}</h4>
              <div className='button' onClick={() => setCalenderViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1))}>&lt;</div>
              <div className='button' onClick={() => setCalenderViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1))}>&gt;</div>
            </div>
        </div>
        <div className="days-of-week">
          {daysOfWeek.map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="days">
          {getDaysInMonth().map((day, index) => (
            <div
              key={index}
              className={`day ${isCurrentDay(day) ? 'current-day' : ''} ${isSelectedDay(day) ? 'task-day' : ''}`}
              onClick={() => day && handleDateClick(day)}
              style={{backgroundColor: `${isCurrentDay(day) && isSelectedDay(day) ? '#2A52BE' : ''}`}}
            >
              {day}
            </div>
          ))}
        </div>
        <div className='todays-tasks'>
          <h2>Today</h2>
          {taskinfo.map((tasks,index) => (
            <CalTaskTemplate key={index} taskdata={tasks} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCalendar;