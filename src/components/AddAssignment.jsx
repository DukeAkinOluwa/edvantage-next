import { useState } from "react";

export default function AddAssignment(){
    const [assignmentData, setAssignmentData] = useState({
        coursecode: '',
        duedate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssignmentData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    function handleSubmit(){
        console.log(assignmentData)
    }
    return(
        <div className="add">
            <div className="header">
                <h3>Add Assignment</h3>
            </div>
            <label>
                <span>Assignment Title</span>
                <input type="text" placeholder="Course code" name="title" onChange={handleInputChange} autoComplete="on" />
            </label>
            <label>
                <span>Course Code</span>
                <input type="text" placeholder="Course code" name="coursecode" onChange={handleInputChange} autoComplete="on" />
            </label>
            <label>
                <span>Due Date</span>
                <input type="date" placeholder="Due date" name="duedate" onChange={handleInputChange} autoComplete="on" />
            </label>
            <label>
                <span>Additional Notes</span>
                <input type="text" className="long-input" placeholder="Enter assignment here" name="details" onChange={handleInputChange} autoComplete="on" />
            </label>
            <div className="button button1" onClick={handleSubmit}><p>Add Assignment</p></div>
        </div>
    )
}