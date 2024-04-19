import ChatIcon from "../../icons/chaticon"
import GroupsIcon from "../../icons/groupsicon"
import AssignmentIcon from "../../icons/assignmenticon"
import ProgressIcon from "../../icons/progressicon"
import TaskIcon from "../../icons/taskicon"

export default function HNTemplate(props){
    const data = props.data
    let notificationtype = data.type
    let notificationtext = data.text
    let notificationtime = data.time
    let typebackgroungcolour
    
    switch (notificationtype) {
        case "PrivateMessage":
            typebackgroungcolour = "#1294F2"
            break;
        case "AssignmentReminder":
            typebackgroungcolour = "blue"
            break;
        case "OverdueReminder":
            typebackgroungcolour = "#EB5757"
            break;
        case "Progress":
            typebackgroungcolour = "#5DC983"
            break;
        case "GroupMessage":
            typebackgroungcolour = "#FBA63C"
            break;
        default:
            break;
    }
    
    // ((notificationtext === "High") ? fontcolour = "#FF6B6B" : fontcolour = "#FFD700" )
    let type_background = {
        backgroundColor: typebackgroungcolour
    }

    return(
        <div className="header-notification row">
            <div className="column1" style={type_background}>
                {notificationtype === "PrivateMessage" && <ChatIcon />}
                {notificationtype === "AssignmentReminder" && <AssignmentIcon />}
                {notificationtype === "Progress" && <ProgressIcon />}
                {notificationtype === "GroupMessage" && <GroupsIcon />}
                {notificationtype === "OverdueReminder" && <TaskIcon />}
            </div>
            <div className="column2">
                <p>{notificationtext}</p>
                <p className="time">{notificationtime}</p>
            </div>
        </div>
    )
}