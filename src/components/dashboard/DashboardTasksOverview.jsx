'use client'

import task_data from "@/DB/taskdata.json";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AddTask from "../AddTask";
import { getAllTasks } from "@/utils/indexedDB";

const DashboardTasksOverview = ({ handleShowPopupNotification }) => {
    const taskdata = task_data.courses;
    const [windowWidth, setWindowWidth] = useState(null);
    const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [focusedInput, setFocusedInput] = useState(null);

    // Fetch assignments once when the component mounts
    useEffect(() => {
        const fetchAssignments = async () => {
        const assignmentsFromDB = await getAllTasks();
        setAssignments(assignmentsFromDB);
        };
        fetchAssignments();
    }, []); // Empty dependency array ensures this effect runs only once

  // Handle window resize events
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array ensures this effect runs only once

    // Memoize filtered tasks based on assignments and windowWidth
    const filteredTasks = useMemo(() => {
        return assignments.filter(task => task.type === 'assignment' || task.type === 'task');
    }, [assignments]);

    const taskinfo = useMemo(() => {
        return windowWidth >= 575.98 ? filteredTasks : filteredTasks.slice(0, 2);
    }, [windowWidth, filteredTasks]);

    // Memoize function handlers to prevent unnecessary re-renders
    const handleAddAssignment = useCallback(() => {
        const fetchAssignments = async () => {
        const assignmentsFromDB = await getAllTasks();
        setAssignments(assignmentsFromDB);
        };
        fetchAssignments();

        setIsAddTaskVisible(prevState => !prevState);
    }, []);

    const handleTaskAdded = useCallback(() => {
        const fetchAssignments = async () => {
        const assignmentsFromDB = await getAllTasks();
        setAssignments(assignmentsFromDB);
        };
        fetchAssignments();

        setIsAddTaskVisible(prevState => !prevState);
    }, []);

    return (
        <div className="dashboard-task-overview-table table">
        <div className="box">
            <div className="dashboard-section-header task-header">
            <div className="dashboard-section-heading">
                <h3>Tasks</h3>
                <div onClick={handleAddAssignment} className="action"><p>Add task</p></div>
            </div>
            <div className="dashboard-t-o-t-header row">
                <div className="column column1"><h5>Course name</h5></div>
                <div className="column column2"><h5>Title</h5></div>
                <div className="column column3"><h5>Date</h5></div>
                <div className="column column4"><h5>Status</h5></div>
            </div>
            </div>
            {taskinfo.map((tasks, index) => (
            <DTOTemplate key={index} taskdata={tasks} />
            ))}
        </div>
        {isAddTaskVisible && (
            <div className="add-item">
            <div className="invisible-background" onClick={handleAddAssignment}></div>
            <AddTask
                handleAddAssignment={handleAddAssignment}
                handleShowPopupNotification={handleShowPopupNotification}
                setFocusedInput={setFocusedInput}
                focusedInput={focusedInput}
                handleTaskAdded={handleTaskAdded}
            />
            </div>
        )}
        </div>
    );
    };

    function DTOTemplate({ taskdata }) {
    const taskstatus = taskdata.status;
    const backgroungcolour = taskstatus === "Completed" ? "#DEF9DD" : "#F9D6DB";
    const fontcolour = taskstatus === "Completed" ? "#64C55F" : "#CB132E";

    return (
        <div className="dashboard-t-o-t-task row">
        <div className="column column1"><h3 className="pc-hidden">Course name</h3><p>{taskdata.title}</p></div>
        <div className="column column2"><h3 className="pc-hidden">Title</h3><p>{taskdata.coursecode}</p></div>
        <div className="column column3"><h3 className="pc-hidden">Date</h3><p>{taskdata.duedate}</p></div>
        <div className="column column4"><h3 className="pc-hidden">Status</h3>
            <div className="table-status" style={{ backgroundColor: backgroungcolour }}>
            <p style={{ color: fontcolour }}>{taskdata.status}</p>
            </div>
        </div>
        </div>
    );
}

export default DashboardTasksOverview;
