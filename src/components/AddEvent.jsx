'use client'

import { useEffect, useState } from "react";
import { addTask, updateTask } from '@/utils/indexedDB';

export default function AddEvent({ handleEventAdded, handleShowPopupNotification, setFocusedInput, focusedInput }){

    const [editingAssignment, setEditingAssignment] = useState(null);
    const [eventType, setEventType] = useState("class")
    const [eventShowOptions, setEventShowOptions] = useState(false)
    const [eventData, setEventData] = useState({});

    useEffect(() => {
        setEventData({
            title: '',
            date: '',
            startTime: '',
            endTime: '',
            type: eventType,
            repeat: 'none'
        })
    }, [eventType])

    console.log("a")

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async () => {
        console.log(eventData)
        if (editingAssignment) {
            await updateTask({ ...editingAssignment, ...assignmentData }).then(setEditingAssignment(null));
            ;
        } else {
            await addTask(eventData);
        }
        handleEventAdded()
        setFocusedInput("")
        handleShowPopupNotification("Event Added", `${eventData.title} has Been Successfully Added`, true)

        setEventData({
            title: '',
            date: '',
            startTime: '',
            endTime: '',
            type: 'event',
            repeat: 'none'
        })
    }

    // function capitaliseFirstLetter(text){
    //     const capitalized = text.charAt(0).toUpperCase() + text.slice(1)
    //     return capitalized
    // }

    function handleSetShowOptions(){
        console.log(eventShowOptions)
        setEventShowOptions(!eventShowOptions)
    }

    function handleSetOption(value){
        setEventType(value)
        setEventShowOptions(false)
    }
    
    function handleSetAutofocus(value){
        setFocusedInput(value)
    }

    console.log(focusedInput)
    
    return(
        <div className="add">
            <div className="header" onClick={handleSetShowOptions}>
                <h3>{eventType === "other" ? "Event" : `${eventType}`}</h3>
            </div>
            {eventType === "other" ? <Other /> : <></>}
            {eventType === "meeting" ? <Meeting /> : <></>}
            {eventType === "class" ? <Class /> : <></>}
            {eventType === "exam" ? <Exam /> : <></>}
            {eventType === "outing" ? <Outing /> : <></>}
            <div className="button button1" onClick={handleSubmit}><p>Add {eventType}</p></div>
            {eventShowOptions === true ? <Options /> : <></>}
        </div>
    )
    function Options(){
        return(
            <div className="options">
                <div className="option" onClick={()=>handleSetOption("class")}>
                    <p>Class</p>
                </div>
                <div className="option" onClick={()=>handleSetOption("exam")}>
                    <p>Exam</p>
                </div>
                <div className="option" onClick={()=>handleSetOption("meeting")}>
                    <p>Meeting</p>
                </div>
                <div className="option" onClick={()=>handleSetOption("outing")}>
                    <p>Outing</p>
                </div>
                <div className="option" onClick={()=>handleSetOption("other")}>
                    <p>Other</p>
                </div>
            </div>
        )
    }
    function Other(){
        return(
            <>
            <label>
                <span>Event</span>
                <input type="text" placeholder="Event Name" name="title" value={eventData.title} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "title"} onClick={()=>handleSetAutofocus("title")} />
            </label>
            <label>
                <span>Date</span>
                <input type="date" placeholder="Event Date" name="date" value={eventData.date} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "date"} onClick={()=>handleSetAutofocus("date")} />
            </label>
            <label>
                <span>Start</span>
                <input type="time" className="long-input" name="startTime" value={eventData.startTime} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "startTime"} onClick={()=>handleSetAutofocus("startTime")} />
            </label>
            <label>
                <span>End</span>
                <input type="time" className="long-input" name="endTime" value={eventData.endTime} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "endTime"} onClick={()=>handleSetAutofocus("endTime")} />
            </label>
            </>
        )
    }
    function Meeting(){
        return(
            <>
            <label>
                <span>Title</span>
                <input type="text" placeholder="Meeting" name="title"  value={eventData.title} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "title"} onClick={()=>handleSetAutofocus("title")} />
            </label>
            <label>
                <span>Location</span>
                <input type="text" placeholder="Meeting Location" name="location"  value={eventData.location} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "location"} onClick={()=>handleSetAutofocus("location")} />
            </label>
            <label>
                <span>Date</span>
                <input type="date" name="date" value={eventData.date} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "date"} onClick={()=>handleSetAutofocus("date")} />
            </label>
            <div className="times">
                <label>
                    <span>Start Time</span>
                    <input type="time" className="long-input" name="startTime" value={eventData.startTime} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "startTime"} onClick={()=>handleSetAutofocus("startTime")} />
                </label>
                <label>
                    <span>End Time</span>
                    <input type="time" className="long-input" name="endTime" value={eventData.endTime} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "endTime"} onClick={()=>handleSetAutofocus("endTime")} />
                </label>
            </div>
            </>
        )
    }
    function Class(){
        return(
            <>
            <label>
                <span>Course Title</span>
                <input type="text" placeholder="Course Title" name="title" value={eventData.title} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "title"} onClick={()=>handleSetAutofocus("title")} />
            </label>
            <label>
                <span>Start Date</span>
                <input type="date" name="date" value={eventData.date} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "startDate"} onClick={()=>handleSetAutofocus("startDate")}  />
            </label>
            <div className="times">
                <label>
                    <span>Start Time</span>
                    <input type="time" className="long-input" name="startTime" value={eventData.startTime} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "startTime"} onClick={()=>handleSetAutofocus("startTime")} />
                </label>
                <label>
                    <span>End Time</span>
                    <input type="time" className="long-input" name="endTime" value={eventData.endTime} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "endTime"} onClick={()=>handleSetAutofocus("endTime")} />
                </label>
            </div>
            </>
        )
    }
    function Exam(){
        return(
            <>
            <label>
                <span>Course Title</span>
                <input type="text" placeholder="Course Title" name="title" value={eventData.title} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "title"} onClick={()=>handleSetAutofocus("title")} />
            </label>
            <label>
                <span>Date</span>
                <input type="date" name="date" value={eventData.date} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "date"} onClick={()=>handleSetAutofocus("startDate")} />
            </label>
            <div className="times">
                <label>
                    <span>Start Time</span>
                    <input type="time" className="long-input" name="startTime" value={eventData.startTime} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "startTime"} onClick={()=>handleSetAutofocus("startTime")} />
                </label>
                <label>
                    <span>End Time</span>
                    <input type="time" className="long-input" name="endTime" value={eventData.endTime} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "endTime"} onClick={()=>handleSetAutofocus("endTime")} />
                </label>
            </div>
            </>
        )
    }
    function Outing(){
        return(
            <>
            <label>
                <span>Event</span>
                <input type="text" placeholder="Outing" name="title" value={eventData.title} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "title"} onClick={()=>handleSetAutofocus("title")} />
            </label>
            <label>
                <span>Location</span>
                <input type="text" placeholder="Location" name="location" value={eventData.location} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "location"} onClick={()=>handleSetAutofocus("location")} />
            </label>
            <label>
                <span>Date</span>
                <input type="date" name="date"  value={eventData.date} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "date"} onClick={()=>handleSetAutofocus("date")} />
            </label>
            <div className="times">
                <label>
                    <span>Start</span>
                    <input type="time" className="long-input" name="startTime" value={eventData.startTime} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "startTime"} onClick={()=>handleSetAutofocus("startTime")} />
                </label>
                <label>
                    <span>End</span>
                    <input type="time" className="long-input" name="endTime" value={eventData.endTime} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "endTime"} onClick={()=>handleSetAutofocus("endTime")} />
                </label>
            </div>
            </>
        )
    }
}