'use client'

import PageRightHeader from "@/components/PageRightHeader"
import { useEffect, useState } from "react";
import { getAllTasks, updateTask } from "@/utils/indexedDB";

export default function Assignments(){

    const [viewportWidth, setViewportWidth] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasksFromDB = await getAllTasks();
            setTasks(tasksFromDB);
        };
    
        fetchTasks();
    }, []);

    useEffect(() => {
        setViewportWidth(window.innerWidth)
    })

    const filteredTasks = tasks.filter(task => {
        if (task.type === 'assignment') {
            return true;
        }
    });
    
    // const taskinfo = userData && userData.assignments;


    return(
        <>
            {viewportWidth < 1001 ? <IndividualPageHeader /> : <PageRightHeader page_title={`Assignment`} userlevel="23"/>}
            {/* {viewportWidth > 655 && } */}
            <div className="assignment-task-overview-table table">
                <div className="box">
                    <div className="assignment-header row">
                        <div className="column1"><h5>Course Title</h5></div>
                        <div className="column2"><h5>Status</h5></div>
                        <div className="column3"><h5>Due Date</h5></div>
                        <div className="column4"><h5>Progress</h5></div>
                        <div className="column5"><h5>Priority</h5></div>
                    </div>
                    {filteredTasks.length > 0 ? (
                        <>
                        {filteredTasks.map((tasks, index) => (
                            <ATTemplate key={index} data={tasks} />
                        ))}</>
                    ) : (
                        <div>No Data</div>
                    )}
                </div>
            </div>
        </>
    )
    function ATTemplate(props){

        const data = props.data
        let status = data.status
        let priority = data.priority
        let statusbackgroungcolour, fontcolour, prioritybackgroungcolour
        
        ((status === "Completed") ? statusbackgroungcolour = "#DEF9DD" : statusbackgroungcolour = "#FFD70033" );
        ((priority === "High") ? prioritybackgroungcolour = "#FF6B6B1A" : prioritybackgroungcolour = "#FFD70033" );
        ((priority === "High") ? fontcolour = "#FF6B6B" : fontcolour = "#FFD700" )
        let status_background = {
            backgroundColor: statusbackgroungcolour
        }
        let priority_background = {
            backgroundColor: prioritybackgroungcolour
        }
        let priority_text = {
            color: fontcolour   
        }
    
        return(
            <div className="assignment-table-task row">
                <div className="column column1"><h3 className="pc-hidden">Course ID</h3><p>{data.coursecode}</p></div>
                <div className="column column2"><h3 className="pc-hidden">Status</h3><div className="table-status" style={status_background}><p>{data.status}</p></div></div>
                <div className="column column3"><h3 className="pc-hidden">Date</h3><p>{data.duedate}</p></div>
                <div className="column column4"><h3 className="pc-hidden">Progress</h3><p>{data.progress}</p></div>
                <div className="column column5"><h3 className="pc-hidden">Priority</h3><div className="table-status" style={priority_background}><p style={priority_text}>{data.priority}</p></div></div>
            </div>
        )
    }
    function IndividualPageHeader(){
  
      function handleRefreshClick(){
        window.history.back()
      }
      
      return(
        <div className="individual-page-header">
          <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            onClick={handleRefreshClick}
          >
            <path
              d="M15 8H1M1 8L8 15M1 8L8 1"
              stroke="#101828"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2>Tasks</h2>
        </div>
      )
    }
}