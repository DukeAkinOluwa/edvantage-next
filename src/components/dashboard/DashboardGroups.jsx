'use client'

import DGTemplate from "../templates/DGTemplate"
import group_info from "../../DB/taskdata.json"
import { useState } from "react"
import AddGroup from "../AddGroup"

export default function DashboardGroup(){
    const taskinfo = group_info.groups
    const [isAddGroupVisible, setIsAddGroupVisible] = useState(false)
    
    function handleAddGroup(){
        if(isAddGroupVisible === false){
            setIsAddGroupVisible(true)
        }else{
            setIsAddGroupVisible(false)
        }
    }
    
    return(
        <div className="dashboard-groups">
            <div className="dashboard-section-header group-header">
                <div className="dashboard-section-heading">
                    <h3>Groups</h3>
                    <div onClick={handleAddGroup} className="action"><p>Create group</p></div>
                </div>
            </div>
            {taskinfo.slice(0, 4).map((groups, index) => (
                 <DGTemplate key={index} groupdata={groups} index={index} />
             ))}
             {isAddGroupVisible === true ? (<div className="add-item"><div className="invisible-background" onClick={handleAddGroup}></div><AddGroup handleAddGroup={handleAddGroup} /></div>) : (<></>) }
        </div>
    )
}