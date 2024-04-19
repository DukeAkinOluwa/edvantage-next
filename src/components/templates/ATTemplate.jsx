export default function ATTemplate(props){

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
            <div className="column column5"><h3 className="pc-hidden">Progress</h3><div className="table-status" style={priority_background}><p style={priority_text}>{data.priority}</p></div></div>
        </div>
    )
}