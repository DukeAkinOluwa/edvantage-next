'use client'

import { useState } from "react";

export default function AddEvent(){
    const [eventData, setEventData] = useState({
        title: '',
        date: '',
        start: '',
        end: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    function handleSubmit(){
        console.log(eventData)
    }
    return(
        <div className="add">
            <div className="header">
                <h3>Add Event</h3>
            </div>
            <label>
                <span>Event</span>
                <input type="text" placeholder="Event Name" name="title" onChange={handleInputChange} autoComplete="on" />
            </label>
            <label>
                <span>Date</span>
                <input type="date" placeholder="Event Date" name="date" onChange={handleInputChange} autoComplete="on" />
            </label>
            <label>
                <span>Start</span>
                <input type="time" className="long-input" placeholder="Enter assignment here" name="start" onChange={handleInputChange} autoComplete="on" />
            </label>
            <label>
                <span>End</span>
                <input type="time" className="long-input" placeholder="Enter assignment here" name="end" onChange={handleInputChange} autoComplete="on" />
            </label>
            <div className="button button1" onClick={handleSubmit}><p>Add Assignment</p></div>
        </div>
    )
}