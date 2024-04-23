'use client'

import { useState, useEffect } from "react"
import AddEvent from "../AddEvent"

export default function DashboardTimeTable(){
    
    const [isAddEventVisible, setIsAddEventVisible] = useState(false)
    const [viewportWidth, setViewportWidth] = useState(null);
  
    const today = new Date();
    const startDate = new Date(today.setDate(today.getDate() - ((today.getDay() || 7))));
    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const times = ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00']
    const eventData = [
        {
            title: "MCT304",
            startTime: "08:00",
            endTime: "10:00",
            type: "class",
            date: "22 Mon"
        },
        {
            title: "EEE304",
            startTime: "11:00",
            endTime: "13:00",
            type: "class",
            date: "22 Mon"
        },,
        {
            title: "MCT302",
            startTime: "14:00",
            endTime: "16:00",
            type: "class",
            date: "22 Mon"
        },
        {
            title: "PHY312",
            startTime: "16:00",
            endTime: "18:00",
            type: "class",
            date: "22 Mon"
        },
        {
            title: "PHY312",
            startTime: "21:00",
            endTime: "22:15",
            type: "exam",
            date: "22 Mon"
        },
        {
            title: "ICT324",
            startTime: "08:00",
            endTime: "09:00",
            type: "class",
            date: "23 Tue"
        },
        {
            title: "MCT308",
            startTime: "10:00",
            endTime: "12:00",
            type: "class",
            date: "23 Tue"
        },
        {
            title: "ENG302",
            startTime: "14:00",
            endTime: "16:00",
            type: "class",
            date: "23 Tue"
        },
        {
            title: "GES302",
            startTime: "16:00",
            endTime: "18:00",
            type: "class",
            date: "23 Tue"
        },
        {
            title: "EEE306",
            startTime: "07:00",
            endTime: "08:00",
            type: "class",
            date: "24 Wed"
        },
        {
            title: "ENG302",
            startTime: "08:00",
            endTime: "10:00",
            type: "class",
            date: "24 Wed"
        },
        {
            title: "CEN304",
            startTime: "10:00",
            endTime: "12:00",
            type: "class",
            date: "24 Wed"
        },
        {
            title: "EEE306",
            startTime: "08:00",
            endTime: "10:00",
            type: "class",
            date: "25 Thu"
        },
        {
            title: "CEN302",
            startTime: "12:00",
            endTime: "14:00",
            type: "class",
            date: "25 Thu"
        },
        {
            title: "Rehearsal",
            startTime: "17:30",
            endTime: "19:30",
            type: "exam",
            date: "26 Fri"
        },
        {
            title: "Rehearsal",
            startTime: "15:30",
            endTime: "17:30",
            type: "exam",
            date: "22 Sat"
        },
        {
            title: "Church",
            startTime: "10:00",
            endTime: "12:00",
            type: "other",
            date: "22 Sun"
        },
    ]

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

    return(
        <section className="dashboard-time-table">
            <div className="dashboard-section-header time-table-header">
                <div className="dashboard-section-heading">
                    <h3>Timetable</h3>
                    <div onClick={handleAddEvent} className="action"><p>Add Event</p></div>
                </div>
            </div>
            <div className="table">
                <div className="table-header">
                    <div className="cell">
                        <h3>Time</h3>
                    </div>
                    {days.map((day) => (
                        <div key={day} className="cell">
                            <h3>{formatDate(new Date(startDate.setDate(startDate.getDate() + 1)))}</h3>
                        </div>
                    ))}
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
                        {eventData ? (
                            eventData.map((info, index) => (
                                <EventTemplate info={info} key={index} eventIndex={index} />
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            {isAddEventVisible === true ? (<div className="add-item"><div className="invisible-background" onClick={handleAddEvent}></div><AddEvent /></div>) : (<></>) }
        </section>
    )
    function EventTemplate({ info, eventIndex }){
        const [isEventDetailsVisible, setIsEventDetailsVisible] = useState(false)
        const [spacing, setSpacing] = useState(null)
        const [distance, setDistance] = useState(null)
        function eventBackColor(){
            let color
            if(eventIndex % 6 === 0){
                color = "#0177FB"
            }else if(eventIndex % 6 === 1){
                color = "#98FB98"
            }else if(eventIndex % 6 === 2){
                color = "#FE6470"
            }else if(eventIndex % 6 === 3){
                color = "#01D7DF"
            }else if(eventIndex % 6 === 4){
                color = "#9747FF"
            }else{
                color = "#F4BB87"
            }
            return({ color })
        }
        function eventStyleLogic(){
            function calculateTimeDifferenceInMinutes(time1, time2) {
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
            function eventLeft() {
                // Calculate the number of days difference between the event date and initDate
                const eventDateParts = info.date.split(' '); // Split "date day" string
                const eventDay = eventDateParts[1]; // Extract the day (Mon, Tue, etc.)
                const daysDifference = days.indexOf(eventDay)
          
                // Calculate left distance based on days difference (consider wrapping around to Sunday)
                const eventLeftDistance = daysDifference * 14.28;
          
                return ({ eventLeftDistance, daysDifference });
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
            <div className="event" style={eventStyleLogic().eventStyles} onClick={handleToggleShowEventDetails}>
                <img src="./Images/EventIcon.png" alt="Event Icon" style={{display: `${eventStyleLogic().eventHeightDifference < 120 && "none"}`}} />
                <p>{info.title}</p>
                {isEventDetailsVisible === true ? (<div className="add-item" style={{zIndex: `${isEventDetailsVisible ? "2" : ""}`}}><div className="invisible-background" onClick={handleToggleShowEventDetails}></div><EventDetails eventDetailData={info} /></div>) : (<></>) }
            </div>
        )
        function EventDetails({eventDetailData}){
            return(
                <div className="add">
                    <div className="header" style={{backgroundColor: `${eventBackColor().color}`}}>
                        <h3 style={{color: "#FFF"}}>{eventDetailData.title}</h3>
                    </div>
                    <label>
                        <span>Title</span>
                        <input type="text" placeholder={`${eventDetailData.title}`} name="title" onChange={() => console.log()} autoComplete="on" />
                    </label>
                    <label>
                        <span>Start Time</span>
                        <input type="time" placeholder={`${eventDetailData.startTime}`} name="title" onChange={() => console.log()} autoComplete="on" />
                    </label>
                    <label>
                        <span>End Time</span>
                        <input type="time" placeholder={`${eventDetailData.endTime}`} name="title" onChange={() => console.log()} autoComplete="on" />
                    </label>
                    <label>
                        <span>Date</span>
                        <input type="date" placeholder={`${eventDetailData.date}`} name="title" onChange={() => console.log()} autoComplete="on" />
                    </label>
                    <div className="button button1" onClick={() => console.log()}><p style={{backgroundColor: `${eventBackColor().color}`}}>Edit</p></div>
                </div>
            )
        }
    }
}
