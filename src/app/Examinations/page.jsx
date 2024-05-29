'use client'

import PageRightHeader from "@/components/PageRightHeader"
import { useEffect, useState } from "react";

export default function Examinations(){
    useEffect(() => {
        // Function to fetch data from local storage asynchronously
        const fetchDataFromLocalStorage = async () => {
            try {
                // Fetch data from local storage
                const storedData = localStorage.getItem('userData');
                if (storedData) {
                    // Parse the stored data and update the state
                    const parsedData = JSON.parse(storedData);
                    setUserData(parsedData);
                } else {
                    console.log('No user data found in local storage.');
                }
            } catch (error) {
                console.error('Error fetching data from local storage:', error);
            }
        };

        // Call the function to fetch data from local storage
        fetchDataFromLocalStorage();
    }, []);
    
    const [userData, setUserData] = useState(null);
    
    const taskinfo = userData && userData.assignments;

    return(
        <>
        <PageRightHeader page_title={`Examinations`} userlevel="23"/>
        <div className="assignment-task-overview-table table">
            <div className="box">
                <div className="assignment-header row">
                    <div className="column1"><h5>Course Title</h5></div>
                    <div className="column2"><h5>Status</h5></div>
                    <div className="column3"><h5>Due Date</h5></div>
                    <div className="column4"><h5>Time</h5></div>
                    <div className="column5"><h5>Venue</h5></div>
                </div>
                {taskinfo ? (
                    <>
                    {taskinfo.map(tasks => (
                    <ETTemplate key={tasks.coursecode.replace(/ /g, "") + tasks.duedate} data={tasks} />
                    ))}
                    </>
                ) : (
                    <div>No Data</div>
                )}
            </div>
        </div>
        </>
    )
    function ETTemplate(props){

        const data = props.data
        let status = data.status
        let statusbackgroungcolour
        
        ((status === "Completed") ? statusbackgroungcolour = "#DEF9DD" : statusbackgroungcolour = "#FFD70033" );
        let status_background = {
            backgroundColor: statusbackgroungcolour
        }
    
        return(
            <div className="assignment-table-task row">
                <div className="column column1"><h3 className="pc-hidden">Course ID</h3><p>{data.coursecode}</p></div>
                <div className="column column2"><h3 className="pc-hidden">Status</h3><div className="table-status" style={status_background}><p>{data.status}</p></div></div>
                <div className="column column3"><h3 className="pc-hidden">Date</h3><p>{data.duedate}</p></div>
                <div className="column column4"><h3 className="pc-hidden">Time</h3><p>{data.time}</p></div>
                <div className="column column5"><h3 className="pc-hidden">Venue</h3><div><p>{data.venue}</p></div></div>
            </div>
        )
    }
}