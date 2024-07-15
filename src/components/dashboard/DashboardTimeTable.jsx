'use client'

import { useState, useEffect } from "react"
import AddEvent from "../AddEvent"
import { getAllTasks, updateTask } from "@/utils/indexedDB";

export default function DashboardTimeTable({ handleShowPopupNotification }){
    
    const [isAddEventVisible, setIsAddEventVisible] = useState(false)
    const [viewportWidth, setViewportWidth] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [reloadTimetable, setReloadTimetable] = useState(false)
    const [focusedInput, setFocusedInput] = useState(null)
    
    const [eventData, setEventData] = useState({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        type: 'event'
    });
  
    const getWeekStart = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        const diff = today.getDate() - dayOfWeek; // Adjust for Sunday
        const startDate = new Date(today.setDate(diff));
        startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
        return startDate;
    };
    
    const startDate = getWeekStart();
      

    const previousDate = new Date(startDate);
    previousDate.setDate(previousDate.getDate() - 1);

    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const times = ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00']

    const filteredTasks = tasks.filter(task => {
        const taskDate = new Date(task.date);
        
        const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 7);
            
        if (task.repeat === 'none') {
            return taskDate >= startDate && taskDate < endDate;
        }else if((task.repeat === 'weekly')){
            return true; // Include the task if repeat is not 'none'
        }
    });

    useEffect(() => {
        const fetchTasks = async () => {
            const tasksFromDB = await getAllTasks();
            setTasks(tasksFromDB);
        };
    
        fetchTasks();
    }, [reloadTimetable]);

    useEffect(() => {
        setViewportWidth(window.innerWidth);

        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function handleAddEvent(){
        setIsAddEventVisible(!isAddEventVisible)
    }
    function handleEventAdded(){
        setIsAddEventVisible(!isAddEventVisible)
        setReloadTimetable(!reloadTimetable)
    }

    return(
        <section className="dashboard-time-table">
            <div className="box">
                <div className="dashboard-section-header time-table-header">
                    <h3>Timetable</h3>
                    <div onClick={handleAddEvent} className="action"><p>Add Event</p></div>
                </div>
                <div className="table">
                    <div className="table-header">
                        <div className="cell">
                            <h3>Time</h3>
                        </div>
                        {[...Array(7)].map((day, index) => {
                            return(
                                <div key={day} className="cell">
                                    <h3>{formatDate(new Date(previousDate.setDate(previousDate.getDate() + 1)))}</h3>
                                </div>
                            )
                        })}
                    </div>
                    <div className="table-content">
                        <div className="left">
                            {times.map((time, index) => (
                                <div className="time-cont" key={index}>
                                    <h3>{time}</h3>
                                </div>
                            ))}
                        </div>
                        <div className="right">
                        { [...Array(24 * 7)].map((_, index) => (
                            <div key={index} className="empty-div"></div>
                        ))}
                            {filteredTasks.length > 0 ? (
                                filteredTasks.filter((task => (task.type === 'exam') || (task.type === 'class') || (task.type === 'meeting') || (task.type === 'outing') || (task.type === 'other'))).map((info, index) => (
                                    <EventTemplate info={info} key={index} />
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
                {isAddEventVisible === true ? (<div className="add-item"><div className="invisible-background" onClick={handleAddEvent}></div><AddEvent handleEventAdded={handleEventAdded} handleShowPopupNotification={handleShowPopupNotification} setFocusedInput={setFocusedInput} focusedInput={focusedInput} /></div>) : (<></>) }
            </div>
        </section>
    )
    function EventTemplate({ info }){
        const [isEventDetailsVisible, setIsEventDetailsVisible] = useState(false)
        const [spacing, setSpacing] = useState(null)
        const [distance, setDistance] = useState(null)
        function eventBackColor(){
            let color
            if(info.type === "class"){
                color = "#0177FB"
            }else if(info.type === "exam"){
                color = "#FE6470"
            }else if(info.type === "outing"){
                color = "#F4BB87"
            }else if(info.type === "meeting"){
                color = "#9747FF"
            }else{
                color = "#01D7DF"
            }
            return({ color })
        }
        function EventStyleLogic(){
            function calculateTimeDifferenceInMinutes(time1, time2) {
                if ((time1 !== undefined) && (time2 !== undefined)) {
                    const time1Parts = time1.split(':');
                    const time2Parts = time2.split(':');
                
                    const date1 = new Date();
                    date1.setHours(parseInt(time1Parts[0]), parseInt(time1Parts[1]), 0, 0);
                
                    const date2 = new Date();
                    date2.setHours(parseInt(time2Parts[0]), parseInt(time2Parts[1]), 0, 0);
                
                    const diffInMs = date2.getTime() - date1.getTime();
                    const diffInMinutes = Math.round(diffInMs / (1000 * 60));
                
                    return diffInMinutes;
                }
                return 0
            }
            function eventLeft() {
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                
                // Extract the date from the info object
                const eventDate = new Date(info.date);
                
                // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
                const eventDayIndex = eventDate.getDay();
                const eventDay = days[eventDayIndex]; // Get the day in "Mon", "Tue", etc.
              
                // Calculate the days difference from the start of the week (e.g., Sunday)
                const daysDifference = eventDayIndex;
              
                // Calculate left distance based on days difference (consider wrapping around to Sunday)
                const eventLeftDistance = daysDifference * 14.28;
              
                return { eventLeftDistance, daysDifference };
            }
            
            const eventHeightDifference = calculateTimeDifferenceInMinutes(info.startTime, info.endTime);
            const eventTopDifference = calculateTimeDifferenceInMinutes("06:00", info.startTime);
            const gap = 3

            useEffect(() => {
                setDistance((eventHeightDifference / 720) * 100)
                setSpacing((eventTopDifference / 720) * 100)
            }, []);

            const eventStyles = {
                width: `${viewportWidth > 759 ? `calc(14.28% - 14px - 6px)` : `calc(${distance}% - 14px - 6px)`}`,
                height: `${viewportWidth > 759 ? `calc(${distance}% - 14px - 6px)` : `calc(14.28% - 14px - 6px)`}`,
                padding: "7px",
                backgroundColor: eventBackColor().color,
                top: `${viewportWidth > 759 ? `calc(${spacing}% + ${gap}px)` : `calc(${eventLeft().eventLeftDistance}% + ${gap}px)`}`,
                left: `${viewportWidth > 759 ? `calc(${eventLeft().eventLeftDistance}% + ${gap}px)` : `calc(${spacing}% + ${gap}px)`}`,
            }
            return({ eventStyles, eventHeightDifference })
        }
        function handleToggleShowEventDetails(){
            setIsEventDetailsVisible(!isEventDetailsVisible)
        }
        return(
            <div className="event" style={EventStyleLogic().eventStyles} onClick={handleToggleShowEventDetails}>
                <h4>{info.title}</h4>
                <p>{info.type}</p>
                {isEventDetailsVisible === true ? (
                    <div className="add-item" style={{zIndex: `${isEventDetailsVisible ? "2" : ""}`}}>
                        <div className="invisible-background" onClick={handleToggleShowEventDetails}>
                        </div><EventDetails eventDetailData={info} />
                    </div>) : (<></>)
                }
            </div>
        )
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
        
                setEventData({
                    title: '',
                    date: '',
                    startTime: '',
                    endTime: '',
                })

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
}
