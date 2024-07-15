import { useState, useEffect } from "react";
import { addTask, updateTask } from '@/utils/indexedDB';

export default function AddTask({ handleTaskAdded, handleShowPopupNotification }) {
    const [taskType, setTaskType] = useState("assignment");
    const [isEditingTask, setIsEditingTask] = useState(null);
    const [taskShowOptions, setTaskShowOptions] = useState(false)
    const [taskData, setTaskData] = useState({});

    useEffect(() => {
        setTaskData({
            title: '',
            duedate: '',
            details: '',
            status: 'Pending',
            type: taskType
        })
    }, [taskType])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (isEditingTask) {
            await updateTask({ ...isEditingTask, ...taskData }).then(setIsEditingTask(null));
            ;
        } else {
            await addTask(taskData);
        }
        handleTaskAdded()
        handleShowPopupNotification("Event Added", `${taskData.title} has Been Successfully Added`, true)

        setTaskData({
        title: '',
        duedate: '',
        details: '',
        status: 'Pending',
        type: taskType,
        });
    };

    const handleSetShowOptions = () => {
        console.log(taskShowOptions)
        setTaskShowOptions(!taskShowOptions)
    };

    const handleSetOption = (value) => {
        setTaskType(value);
        setTaskData({ // Reset some data on event type change (optional)
        title: '',
        details: '',
        });
    };

    function getComponentContent() {
        switch (taskType) {
        case "assignment":
            return (
                <>
                <label>
                    <span>Title</span>
                    <input type="text" placeholder="Assignment Title" name="title"  value={taskData.title} onChange={handleInputChange} autoComplete="on" />
                </label>
                <label>
                    <span>Course Code</span>
                    <input type="text" placeholder="Course code" name="coursecode" value={taskData.coursecode} onChange={handleInputChange} autoComplete="on" />
                </label>
                <label>
                    <span>Due Date</span>
                    <input type="date" placeholder="Due date" name="duedate" value={taskData.duedate} onChange={handleInputChange} autoComplete="on" />
                </label>
                <label>
                    <span>Additional Notes</span>
                    <input type="text" className="long-input" placeholder="Enter assignment details" name="details" value={taskData.details} onChange={handleInputChange} autoComplete="on" />
                </label>
                </>
            );
        case "task":
            return (
                <>
                <label>
                    <span>Task</span>
                    <input type="text" placeholder="Task Name" name="title" value={taskData.title} onChange={handleInputChange} autoComplete="on" />
                </label>
                <label>
                    <span>Due Date</span>
                    <input type="date" placeholder="Due date" name="duedate" value={taskData.duedate} onChange={handleInputChange} autoComplete="on" />
                </label>
                <label>
                    <span>Additional Notes</span>
                    <input type="text" className="long-input" placeholder="Enter assignment details" name="details" value={taskData.details} onChange={handleInputChange} autoComplete="on" />
                </label>
                </>
            );
        default:
            return null;
        }
    }

    function getOptionComponent(){
        switch (taskShowOptions) {
            case true:
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
                break;
        
            default:
                break;
        }
    }

    return (
        <div className="add">
        <div className="header" onClick={handleSetShowOptions}>
            <h3>{taskType.toUpperCase()}</h3>
        </div>
        {getComponentContent()}
        <div className="button button1" onClick={handleSubmit}>
            <p>Add {taskType}</p>
        </div>
        {getOptionComponent()}
        </div>
    )
}