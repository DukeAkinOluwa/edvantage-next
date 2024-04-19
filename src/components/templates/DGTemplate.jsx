export default function DGTemplate(props){

    const groupdata = props.groupdata

    const index = props.index
    let groupsidecolor
    
    (((index % 2) === 0) ? groupsidecolor = "#2A52BE" : groupsidecolor = "#F5F5F5" );
    let group_side_color = {
        backgroundColor: groupsidecolor
    }

    return(
        <div className="dashboard-group">
            <div className="dashboard-group-left">
                <div className="circle" style={group_side_color}></div>
                <div className="line"></div>
            </div>
            <div className="dashboard-group-right">
                <h3>{groupdata.groupname}</h3>
                <p>{groupdata.groupdetail}</p>
                <p>Members: {groupdata.noofmembers}</p>
                <div className="group-links">
                    <div className="button1"><p>Join Group</p></div>
                    <div className="view-resources"><p>View Resources</p></div>
                </div>
            </div>
        </div>
    )
}