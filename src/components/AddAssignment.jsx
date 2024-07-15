'use client'

import { useEffect, useState } from "react";
import { addTask, updateTask } from '@/utils/indexedDB';

export default function AddEvent({ handleTaskAdded, handleShowPopupNotification, setFocusedInput, focusedInput }){

    const [editingAssignment, setEditingAssignment] = useState(null);
    const [eventType, setEventType] = useState("assignment")
    const [eventShowOptions, setEventShowOptions] = useState(false)
    const [assignmentData, setAssignmentData] = useState({});

    useEffect(() => {
        setAssignmentData({
            title: '',
            duedate: '',
            details: '',
            status: 'Pending',
            type: eventType
        })
    }, [eventType])

    console.log("a")

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssignmentData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async () => {
        console.log(assignmentData)
        if (editingAssignment) {
            await updateTask({ ...editingAssignment, ...assignmentData }).then(setEditingAssignment(null));
            ;
        } else {
            await addTask(assignmentData);
        }
        handleTaskAdded()
        setFocusedInput("")
        handleShowPopupNotification("Event Added", `${assignmentData.title} has Been Successfully Added`, true)

        setAssignmentData({
            title: '',
            duedate: '',
            details: '',
            status: 'Pending',
            type: eventType
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
                <h3>{eventType.toUpperCase()}</h3>
            </div>
            {eventType === "assignment" ? <Assignment /> : <></>}
            {eventType === "task" ? <Task /> : <></>}
            <div className="button button1" onClick={handleSubmit}><p>Add {eventType}</p></div>
            {eventShowOptions === true ? <Options /> : <></>}
        </div>
    )
    function Options(){
        return(
            <div className="options">
                <div className="option" onClick={()=>handleSetOption("assignment")}>
                    <p>Assignment</p>
                </div>
                <div className="option" onClick={()=>handleSetOption("task")}>
                    <p>Task</p>
                </div>
            </div>
        )
    }
    function Task(){
        return(
            <>
            <label>
                <span>Task</span>
                <input type="text" placeholder="Task Name" name="title" value={assignmentData.title} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "title"} onClick={()=>handleSetAutofocus("title")} />
            </label>
            <label>
                <span>Due Date</span>
                <input type="date" placeholder="Due date" name="duedate" value={assignmentData.duedate} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "duedate"} onClick={()=>handleSetAutofocus("duedate")} />
            </label>
            <label>
                <span>Additional Notes</span>
                <input type="text" className="long-input" placeholder="Enter assignment details" name="details" value={assignmentData.details} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "details"} onClick={()=>handleSetAutofocus("details")} />
            </label>
            </>
        )
    }
    function Assignment(){
        return(
            <>
            <label>
                <span>Title</span>
                <input type="text" placeholder="Assignment Title" name="title"  value={assignmentData.title} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "title"} onClick={()=>handleSetAutofocus("title")} />
            </label>
            <label>
                <span>Course Code</span>
                <input type="text" placeholder="Course code" name="coursecode" value={assignmentData.coursecode} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "coursecode"} onClick={()=>handleSetAutofocus("coursecode")} />
            </label>
            <label>
                <span>Due Date</span>
                <input type="date" placeholder="Due date" name="duedate" value={assignmentData.duedate} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "duedate"} onClick={()=>handleSetAutofocus("duedate")} />
            </label>
            <label>
                <span>Additional Notes</span>
                <input type="text" className="long-input" placeholder="Enter assignment details" name="details" value={assignmentData.details} onChange={handleInputChange} autoComplete="on" autoFocus={focusedInput === "details"} onClick={()=>handleSetAutofocus("details")} />
            </label>
            </>
        )
    }
}