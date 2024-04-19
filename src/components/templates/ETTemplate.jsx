export default function ETTemplate(props){

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