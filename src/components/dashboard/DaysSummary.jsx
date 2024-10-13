'use client'

import task_data from "@/DB/taskdata.json";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AddEvent from "../AddEvent"
import { getAllTasks } from "@/utils/indexedDB";

const DaysSummary = ({ handleShowPopupNotification }) => {
    const taskdata = task_data.courses;
    const [windowWidth, setWindowWidth] = useState(null);
    const [isAddEventVisible, setIsAddEventVisible] = useState(false)
    const [reloadTimetable, setReloadTimetable] = useState(false)
    const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [focusedInput, setFocusedInput] = useState(null);

    // Fetch assignments once when the component mounts
    useEffect(() => {
        const fetchAssignments = async () => {
            const assignmentsFromDB = await getAllTasks();
            setAssignments(assignmentsFromDB);
        };
        fetchAssignments();
    }, [reloadTimetable]); // Empty dependency array ensures this effect runs only once

  // Handle window resize events
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array ensures this effect runs only once

    // Memoize filtered tasks based on assignments and windowWidth
    const filteredTasks = useMemo(() => {
        // return assignments.filter(task => task.type === 'assignment' || task.type === 'task');
        return assignments;
    }, [assignments]);

    const taskinfo = useMemo(() => {
        return windowWidth >= 575.98 ? filteredTasks : filteredTasks.slice(0, 8);
    }, [windowWidth, filteredTasks]);
    
    function handleAddEvent(){
        setIsAddEventVisible(!isAddEventVisible)
    }
    function handleEventAdded(){
        setIsAddEventVisible(!isAddEventVisible)
        setReloadTimetable(!reloadTimetable)
    }

    return (
        <div className="dashboard-today-summary pc-hidden">
            <div className="box">
                <div className="dashboard-section-header task-header">
                    <div className="dashboard-section-heading">
                        <h3>Todays Events</h3>
                        <div onClick={handleAddEvent} className="action"><p>Add Event</p></div>
                    </div>
                </div>
                {taskinfo.map((tasks, index) => (
                <DTOTemplate key={index} taskdata={tasks} />
                ))}
                {isAddEventVisible === true ? (<div className="add-item"><div className="invisible-background" onClick={handleAddEvent}></div><AddEvent handleEventAdded={handleEventAdded} handleShowPopupNotification={handleShowPopupNotification} setFocusedInput={setFocusedInput} focusedInput={focusedInput} /></div>) : (<></>) }
            </div>
        </div>
    );
};

function DTOTemplate({ taskdata }) {
    const taskstatus = taskdata.status;
    const backgroungcolour = taskstatus === "Completed" ? "#DEF9DD" : "#F9D6DB";
    const fontcolour = taskstatus === "Completed" ? "#64C55F" : "#CB132E";
    
    function eventBackColor(){
        let color = ""
        // if(taskdata.type === "class"){
        //     color = "#0177FB"
        // }else if(taskdata.type === "exam"){
        //     color = "#FE6470"
        // }else if(taskdata.type === "outing"){
        //     color = "#F4BB87"
        // }else if(taskdata.type === "meeting"){
        //     color = "#9747FF"
        // }else{
        //     color = "#01D7DF"
        // }
        return({ color })
    }

    switch (taskdata.type) {
        case "class":
            return(
                <div className="row" style={{backgroundColor: `${eventBackColor().color}`}}>
                    <div className="column">
                        <p>Class</p>
                        <h3>{taskdata.title}</h3>
                    </div>
                    <div className="column">
                        <p>Time</p>
                        <h3>{taskdata.startTime} - {taskdata.endTime}</h3>
                    </div>
                </div>
            );
        case "exam":
            return(
                <div className="row" style={{backgroundColor: `${eventBackColor().color}`}}>
                    <div className="column">
                        <p>Meeting</p>
                        <h3>{taskdata.title}</h3>
                    </div>
                    <div className="column">
                        <p>Time</p>
                        <h3>{taskdata.startTime} - {taskdata.endTime}</h3>
                    </div>
                </div>
            );
        case "outing":
            return(
                <div className="row" style={{backgroundColor: `${eventBackColor().color}`}}>
                    <div className="column">
                        <p>Outing</p>
                        <h3>{taskdata.title}</h3>
                    </div>
                    <div className="column">
                        <p>Time</p>
                        <h3>{taskdata.startTime} - {taskdata.endTime}</h3>
                    </div>
                </div>
            );
        case "meeting":
            return(
                <div className="row" style={{backgroundColor: `${eventBackColor().color}`}}>
                    <div className="column">
                        <p>Subject</p>
                        <h3>{taskdata.title}</h3>
                    </div>
                    <div className="column">
                        <p>Time</p>
                        <h3>{taskdata.startTime} - {taskdata.endTime}</h3>
                    </div>
                </div>
            );
        case "other":
            return(
                <div className="row" style={{backgroundColor: `${eventBackColor().color}`}}>
                    <div className="column">
                        <p>Event</p>
                        <h3>{taskdata.title}</h3>
                    </div>
                    <div className="column">
                        <p>Time</p>
                        <h3>{taskdata.startTime} - {taskdata.endTime}</h3>
                    </div>
                </div>
            );
        case "assignment":
            return(
                <div className="row" style={{backgroundColor: `${eventBackColor().color}`}}>
                    <div className="column">
                        <p>Assignment</p>
                        <h3>{taskdata.title}</h3>
                    </div>
                    <div className="column">
                        <p>Due</p>
                        <h3>{taskdata.dueTime}</h3>
                    </div>
                </div>
            );
        case "task":
            return(
                <div className="row" style={{backgroundColor: `${eventBackColor().color}`}}>
                    <div className="column">
                        <p>Assignment</p>
                        <h3>{taskdata.title}</h3>
                    </div>
                    <div className="column">
                        <p>Due</p>
                        <h3>{taskdata.dueTime}</h3>
                    </div>
                </div>
            );
        default:
            return(
                <></>
            );
    }
}

export default DaysSummary;
