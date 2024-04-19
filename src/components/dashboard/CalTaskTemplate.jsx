function CalTaskTemplate(props){
    const taskdata = props.taskdata
    return(
        <div className="dashboard-cal-task">
            <h3>{taskdata.taskname}</h3>
            <div className="cal-task-time"><p>{taskdata.starttime} - {taskdata.endtime}</p></div>
            <p>{taskdata.taskdetail}</p>
        </div>
    )
}
export default CalTaskTemplate