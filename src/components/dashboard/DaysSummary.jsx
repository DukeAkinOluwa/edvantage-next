'use client'

import task_data from "@/DB/taskdata.json";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AddEvent from "../AddEvent"
import { getAllTasks, updateTask } from "@/utils/indexedDB";

const DaysSummary = ({ handleShowPopupNotification }) => {
    const taskdata = task_data.courses;
    const [windowWidth, setWindowWidth] = useState(null);
    const [isAddEventVisible, setIsAddEventVisible] = useState(false)
    const [reloadTimetable, setReloadTimetable] = useState(false)
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
        return windowWidth >= 575.98 ? filteredTasks : filteredTasks.slice(0, 6);
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
                        <h3>Todays Schedule</h3>
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
    function DTOTemplate({ taskdata }) {
        const taskstatus = taskdata.status;
        const [isEventDetailsVisible, setIsEventDetailsVisible] = useState(false)
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
        function handleShowEventDetails(){
            setIsEventDetailsVisible(true)
        }
    
        let label, time;
        switch (taskdata.type) {
            case "class":
                label = "Class";
                time = `${taskdata.startTime} - ${taskdata.endTime}`;
                break;
            case "exam":
                label = "Exam";
                time = `${taskdata.startTime} - ${taskdata.endTime}`;
                break;
            case "outing":
                label = "Outing";
                time = `${taskdata.startTime} - ${taskdata.endTime}`;
                break;
            case "meeting":
                label = "Subject";
                time = `${taskdata.startTime} - ${taskdata.endTime}`;
                break;
            case "other":
                label = "Event";
                time = `${taskdata.startTime} - ${taskdata.endTime}`;
                break;
            case "assignment":
            case "task":
                label = "Assignment";
                time = `${taskdata.dueTime}`;
                break;
            default:
                return null;
        }
        return (
            <div className="row" style={{ backgroundColor: eventBackColor().color }} onClick={handleShowEventDetails}>
                <div className="column">
                    <p>{label}</p>
                    <h3>{taskdata.title}</h3>
                </div>
                <div className="column">
                    <p>{taskdata.type === "assignment" || taskdata.type === "task" ? "Due" : "Time"}</p>
                    <h3>{time}</h3>
                </div>            
                {isEventDetailsVisible === true ? (
                    <div className="add-item" style={{zIndex: `${isEventDetailsVisible ? "2" : ""}`}}>
                        <div className="invisible-background" onClick={handleShowEventDetails}>
                        </div><EventDetails eventDetailData={taskdata} />
                    </div>) : (<></>)
                }
            </div>
        );
        function EventDetails({eventDetailData}){
    
            const [editingAssignment, setEditingAssignment] = useState(null);
            const [isEditing, setIsEditing] = useState(false);
            const [eventData, setEventData] = useState(eventDetailData);
    
            const handleInputChange = (e) => {
                const { name, value } = e.target;
                setEventData((prevData) => ({
                ...prevData,
                [name]: value,
                }));
                
                setIsEditing(true); // Set back to read-only mode after submit
            };
    
            const handleEditClick = () => {
              setIsEditing(true);
              setEditingAssignment(eventDetailData)
            };
    
            const handleSubmit = async () => {
                await updateTask({ ...editingAssignment, ...eventData });
                setIsEditing(false);
                setReloadTimetable(!reloadTimetable)
                handleShowPopupNotification("Update Successful", `${eventData.title} has been updated`)
                setIsEventDetailsVisible(false)
            }
    
            return(
                <form className="add">
                    <div className="header" style={{backgroundColor: `${eventBackColor().color}`}}>
                        <h3 style={{color: "#FFF"}}>{eventData.type.toUpperCase()}</h3>
                    </div>
                    <label>
                        <span>Title</span>
                        <input type="text" value={`${eventData.title}`} name="title" onChange={handleInputChange} disabled={!isEditing} autoComplete="on" />
                    </label>
                    <label>
                        <span>Start Time</span>
                        <input type="time" value={`${eventData.startTime}`} name="startTime" onChange={handleInputChange} disabled={!isEditing} autoComplete="on" />
                    </label>
                    <label>
                        <span>End Time</span>
                        <input type="time" value={`${eventData.endTime}`} name="endTime" onChange={handleInputChange} disabled={!isEditing} autoComplete="on" />
                    </label>
                    <label>
                        <span>Date</span>
                        <input type="date" value={`${eventData.date}`} name="date" onChange={handleInputChange} disabled={!isEditing} autoComplete="on" />
                    </label>
                    <div className="button button1" onClick={isEditing ? handleSubmit : handleEditClick}><p style={{backgroundColor: `${eventBackColor().color}`}}>{isEditing ? <>Save</> : <>Edit</>}</p></div>
                </form>
            )
        }
    }
};

export default DaysSummary;
