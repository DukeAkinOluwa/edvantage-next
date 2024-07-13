import { useState } from 'react';
import { addTask, updateTask } from '@/utils/indexedDB';

export default function AddAssignment() {
    
    const [editingAssignment, setEditingAssignment] = useState(null);

    const [assignmentData, setAssignmentData] = useState({
        title: '',
        coursecode: '',
        duedate: '',
        details: '',
        status: 'Pending',
        category: 'assignment'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssignmentData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (editingAssignment) {
            await updateTask({ ...editingAssignment, ...assignmentData });
            setEditingAssignment(null);
        } else {
            await addTask(assignmentData);
        }

        setAssignmentData({
        title: '',
        coursecode: '',
        duedate: '',
        details: '',
        status: 'Pending'
        });
    };

    const handleEditAssignment = (assignment) => {
        setEditingAssignment(assignment);
        setAssignmentData(assignment);
    };

    return (
        <div className="add">
            <div className="header">
                <h3>Add Assignment</h3>
            </div>
            <label>
                <span>Assignment Title</span>
                <input type="text" placeholder="Assignment title" name="title" value={assignmentData.title} onChange={handleInputChange} autoComplete="on"/>
            </label>
            <label>
                <span>Course Code</span>
                <input type="text" placeholder="Course code" name="coursecode" value={assignmentData.coursecode} onChange={handleInputChange} autoComplete="on"/>
            </label>
            <label>
                <span>Due Date</span>
                <input type="date" placeholder="Due date" name="duedate" value={assignmentData.duedate} onChange={handleInputChange} autoComplete="on"/>
            </label>
            <label>
                <span>Additional Notes</span>
                <input type="text" className="long-input" placeholder="Enter assignment details" name="details" value={assignmentData.details} onChange={handleInputChange} autoComplete="on"/>
            </label>
            <div className="button button1" onClick={handleSubmit}>
                <p>{editingAssignment ? 'Update Assignment' : 'Add Assignment'}</p>
            </div>

            {/* <div className="assignments-list">
                <h3>Assignments</h3>
                <ul>
                {assignments.map((assignment) => (
                    <li key={assignment.id}>
                    {assignment.title} - {assignment.coursecode} - {assignment.duedate} - {assignment.details}
                    <button onClick={() => handleEditAssignment(assignment)}>Edit</button>
                    </li>
                ))}
                </ul>
            </div> */}
        </div>
    );
}
