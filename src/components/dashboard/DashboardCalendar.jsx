import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { getAllTasks } from "@/utils/indexedDB";

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 
const DashboardCalendar = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarViewDate, setCalendarViewDate] = useState(new Date());

  const year = calendarViewDate.getFullYear();
  const month = calendarViewDate.getMonth();
  console.log(calendarViewDate.getMonth(), month)

  useEffect(() => {
    const fetchTasks = async () => {
        const tasksFromDB = await getAllTasks()
        setTasks(tasksFromDB);
    };

    fetchTasks();
  }, []);
  
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
        const taskDate = new Date(task.date);
        const now = new Date()
        return (
            ((taskDate.getFullYear() <= now.getFullYear() && taskDate.getMonth() <= now.getMonth() && taskDate.getDate() < now.getDate()) && (taskDate.getFullYear() === selectedDate.getFullYear() && taskDate.getMonth() === selectedDate.getMonth() && taskDate.getDate() === selectedDate.getDate())) ||
            (taskDate.getFullYear() === selectedDate.getFullYear() &&
            taskDate.getMonth() === selectedDate.getMonth() &&
            taskDate.getDate() === selectedDate.getDate() &&
            (
                (task.endTime && (function() {
                  const timeParts = task.endTime.split(':');
                  const hours = parseInt(timeParts[0], 10);
                  const minutes = parseInt(timeParts[1], 10);
                  return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), hours, minutes) > selectedDate;
                })) || (task.time && (function() {
                  const timeParts = task.time.split(':');
                  const hours = parseInt(timeParts[0], 10);
                  const minutes = parseInt(timeParts[1], 10);
                  return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), hours, minutes) > selectedDate;
                }))
            ))
        );
    });
  }, [tasks, selectedDate]);  

  const getMonthData = useMemo(() => {
    const year = calendarViewDate.getFullYear();
    const month = calendarViewDate.getMonth();

    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    const daysInMonth = [...Array(lastDay)].map((_, i) => i + 1);
    const daysBefore = Array(firstDayOfWeek).fill(null);
    const daysAfter = Array(6 - (lastDay + firstDayOfWeek) % 7).fill(null);

    return [...daysBefore, ...daysInMonth, ...daysAfter];
  }, [calendarViewDate]);

  const handleDateClick = useCallback((day) => {
    setSelectedDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), day));
  }, [calendarViewDate]);

  const isCurrentDay = useCallback((day) => {
    console.log(calendarViewDate.getMonth(), month)
    const today = new Date();
    return month === today.getMonth() && year === today.getFullYear() && day === today.getDate();
  }, []);

  const isSelectedDay = useCallback((day) => {
    return month === selectedDate.getMonth() && year === selectedDate.getFullYear() && day === selectedDate.getDate();
  }, [selectedDate]);

  return (
    <div className="dashboard-calendar">
      <div className="box">
        <div className="dashboard-section-header calendar-header">
          <h3>Calendar</h3>
          <div className="month-info">
            <h4>{new Intl.DateTimeFormat('en-UK', { month: 'long', year: 'numeric' }).format(calendarViewDate)}</h4>
            <div className="button" onClick={() => setCalendarViewDate(new Date(year, month - 1, 1))}>&lt;</div>
            <div className="button" onClick={() => setCalendarViewDate(new Date(year, month + 1, 1))}>&gt;</div>
          </div>
        </div>
        <div className="days-of-week">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="days">
          {getMonthData.map((day, index) => (
            <div
              key={index}
              className={`day ${isCurrentDay(day) ? 'current-day' : ''} ${isSelectedDay(day) ? 'task-day' : ''}`}
              onClick={() => day && handleDateClick(day)}
              style={{ backgroundColor: `${isCurrentDay(day) && isSelectedDay(day) ? '#2A52BE' : ''}` }}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="todays-tasks">
          <h2>Today</h2>
          {filteredTasks.map((task, index) => {
            return(
              <CalTaskTemplate key={index} taskdata={task} />
            )
          })}
        </div>
      </div>
    </div>
  );
  function CalTaskTemplate(props){
    const taskdata = props.taskdata
    return(
        <div className="dashboard-cal-task">
          <h3>{taskdata.title}</h3>
          <div className="cal-task-time"><p>{taskdata.startTime} - {taskdata.endTime}</p></div>
          {/* <p>{taskdata.taskdetail}</p> */}
        </div>
    )
}
};

export default DashboardCalendar;