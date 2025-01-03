import { useState, useEffect } from "react";
import { addTask, updateTask } from '@/utils/indexedDB';

export default function AddEvent({ handleEventAdded, handleShowPopupNotification }) {
    const [editingAssignment, setEditingAssignment] = useState(null);
    const [eventType, setEventType] = useState("class");
    const [eventShowOptions, setEventShowOptions] = useState(false);
    const [eventData, setEventData] = useState({});
    const [focusedInput, handleSetFocusedInput] = useState("");
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

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

    useEffect(() => {
        validateForm();
    }, [eventData]);

    // Validation rules
    const validateInputs = (name, value) => {
        let errorMsg = '';
        if (!value.trim()) {
            errorMsg = `${name} is required`;
        } else if (name === 'title' && !/^[a-zA-Z0-9\s]+$/.test(value)) {
            errorMsg = 'Title should contain only alphanumeric characters';
        } else if (name === 'location' && !/^[a-zA-Z0-9\s]+$/.test(value)) {
            errorMsg = 'Location should contain only alphanumeric characters';
        }
        return errorMsg;
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(eventData).forEach((key) => {
            const error = validateInputs(key, eventData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0); // Form is valid if there are no errors
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
        ...prevData,
        [name]: value,
        }));

        // Validate individual input on change
        const error = validateInputs(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const handleSubmit = async () => {
        validateForm()
        if (!isValid) {
            // If the form is invalid, prevent submission
            handleShowPopupNotification("Error", "Please fill out all fields with valid data", true);
            return;
        }

        // Come back to check this eventData guy. Was changed from assignmentData
        if (editingAssignment) {
            await updateTask({ ...editingAssignment, ...eventData }).then(setEditingAssignment(null));
            ;
        } else {
            await addTask(eventData);
        }
        handleEventAdded()
        handleShowPopupNotification("Event Added", `${eventData.title} has Been Successfully Added`, true)
        setEventData({
            title: '',
            duedate: '',
            startTime: '',
            endTime: '',
            type: eventType,
            repeat: 'none'
        });
    };

    const handleSetShowOptions = () => {
        console.log(eventShowOptions)
        setEventShowOptions(!eventShowOptions)
    };

    const handleSetOption = (value) => {
        setEventType(value);
        setEventShowOptions(false)
        setEventData({
            title: '',
            duedate: '',
            startTime: '',
            endTime: '',
            type: eventType,
            repeat: 'none'
        });
    };

    function getComponentContent() {
        switch (eventType) {
        case "class":
            return (
                <>
                    <label>
                        <span>Course Title</span>
                        <input type="text" placeholder="Course Title" name="title" value={eventData.title} onChange={handleInputChange} autoComplete="on" />
                    </label>
                    <label>
                        <span>Start Date</span>
                        <input type="date" name="date" value={eventData.date} onChange={handleInputChange} autoComplete="on"  />
                    </label>
                    <div className="times">
                        <label>
                            <span>Start Time</span>
                            <input type="time" className="long-input" name="startTime" value={eventData.startTime} onChange={handleInputChange} autoComplete="on" />
                        </label>
                        <label>
                            <span>End Time</span>
                            <input type="time" className="long-input" name="endTime" value={eventData.endTime} onChange={handleInputChange} autoComplete="on" />
                        </label>
                    </div>
                </>
            );
        case "exam":
            return (
                <>
                    <label>
                        <span>Course Title</span>
                        <input type="text" placeholder="Course Title" name="title" value={eventData.title} onChange={handleInputChange} autoComplete="on" />
                    </label>
                    <label>
                        <span>Date</span>
                        <input type="date" name="date" value={eventData.date} onChange={handleInputChange} autoComplete="on" />
                    </label>
                    <div className="times">
                        <label>
                            <span>Start Time</span>
                            <input type="time" className="long-input" name="startTime" value={eventData.startTime} onChange={handleInputChange} autoComplete="on" />
                        </label>
                        <label>
                            <span>End Time</span>
                            <input type="time" className="long-input" name="endTime" value={eventData.endTime} onChange={handleInputChange} autoComplete="on" />
                        </label>
                    </div>
                </>
            );
            case "outing":
                return (
                    <>
                        <label>
                            <span>Event</span>
                            <input type="text" placeholder="Outing" name="title" value={eventData.title} onChange={handleInputChange} autoComplete="on" />
                        </label>
                        <label>
                            <span>Location</span>
                            <input type="text" placeholder="Location" name="location" value={eventData.location} onChange={handleInputChange} autoComplete="on" />
                        </label>
                        <label>
                            <span>Date</span>
                            <input type="date" name="date"  value={eventData.date} onChange={handleInputChange} autoComplete="on" />
                        </label>
                        <div className="times">
                            <label>
                                <span>Start</span>
                                <input type="time" className="long-input" name="startTime" value={eventData.startTime} onChange={handleInputChange} autoComplete="on" />
                            </label>
                            <label>
                                <span>End</span>
                                <input type="time" className="long-input" name="endTime" value={eventData.endTime} onChange={handleInputChange} autoComplete="on" />
                            </label>
                        </div>
                        </>
                );
        case "meeting":
            return (
                <>
                    <label>
                        <span>Title</span>
                        <input type="text" placeholder="Meeting" name="title"  value={eventData.title} onChange={handleInputChange} autoComplete="on" />
                    </label>
                    <label>
                        <span>Location</span>
                        <input type="text" placeholder="Meeting Location" name="location"  value={eventData.location} onChange={handleInputChange} autoComplete="on" />
                    </label>
                    <label>
                        <span>Date</span>
                        <input type="date" name="date" value={eventData.date} onChange={handleInputChange} autoComplete="on" />
                    </label>
                    <div className="times">
                        <label>
                            <span>Start Time</span>
                            <input type="time" className="long-input" name="startTime" value={eventData.startTime} onChange={handleInputChange} autoComplete="on" />
                        </label>
                        <label>
                            <span>End Time</span>
                            <input type="time" className="long-input" name="endTime" value={eventData.endTime} onChange={handleInputChange} autoComplete="on" />
                        </label>
                    </div>
                </>
            );
            case "other":
                return (
                    <>
                        <label>
                            <span>Event</span>
                            <input type="text" placeholder="Event Name" name="title" value={eventData.title} onChange={handleInputChange} autoComplete="on" />
                        </label>
                        <label>
                            <span>Date</span>
                            <input type="date" placeholder="Event Date" name="date" value={eventData.date} onChange={handleInputChange} autoComplete="on" />
                        </label>
                        <label>
                            <span>Start</span>
                            <input type="time" className="long-input" name="startTime" value={eventData.startTime} onChange={handleInputChange} autoComplete="on" />
                        </label>
                        <label>
                            <span>End</span>
                            <input type="time" className="long-input" name="endTime" value={eventData.endTime} onChange={handleInputChange} autoComplete="on" />
                        </label>
                    </>
                );
        default:
            return null;
        }
    }

    function getOptionComponent(){
        switch (eventShowOptions) {
            case true:
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
                break;
        
            default:
                break;
        }
    }

    return (
        <div className="add">
        <div className="header" onClick={handleSetShowOptions}>
            <h3>{eventType.toUpperCase()}</h3>
        </div>
        {getComponentContent()}
        <div className="button button1" onClick={handleSubmit}>
            <p>Add {eventType}</p>
        </div>
        {getOptionComponent()}
        </div>
    )
}