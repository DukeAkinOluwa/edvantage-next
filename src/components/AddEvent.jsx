'use client'

import { useState } from "react";
import { addTask, updateTask } from '@/utils/indexedDB';

export default function AddEvent({ setReloadTimetable, setIsAddEventVisible, reloadTimetable, isAddEventVisible, handleShowPopupNotification }){

    const [editingAssignment, setEditingAssignment] = useState(null);
    const [eventData, setEventData] = useState({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        type: 'event',
        repeat: 'none'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (editingAssignment) {
            await updateTask({ ...editingAssignment, ...assignmentData });
            setEditingAssignment(null);
        } else {
            await addTask(eventData);
        }
        setReloadTimetable(!reloadTimetable)
        setIsAddEventVisible(!isAddEventVisible)
        handleShowPopupNotification("Event Added", `${eventData.title} has Been Successfully Added`)

        setEventData({
            title: '',
            date: '',
            startTime: '',
            endTime: '',
            type: 'event',
            repeat: 'none'
        })
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
                <input type="time" className="long-input" placeholder="Enter assignment here" name="startTime" onChange={handleInputChange} autoComplete="on" />
            </label>
            <label>
                <span>End</span>
                <input type="time" className="long-input" placeholder="Enter assignment here" name="endTime" onChange={handleInputChange} autoComplete="on" />
            </label>
            <div className="button button1" onClick={handleSubmit}><p>Add Assignment</p></div>
        </div>
    )
}