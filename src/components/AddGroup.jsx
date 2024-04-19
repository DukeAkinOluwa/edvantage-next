'use client'

import { useState } from "react";

export default function AddGroup(){
    const [groupData, setGroupData] = useState({
        
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGroupData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    function handleSubmit(){
        console.log(groupData)
    }
    return(
        <div className="add">
            <div className="header">
                <h3>Add Group</h3>
            </div>
            <label>
                <span>Group name</span>
                <input type="text" placeholder="Course code" name="groupname" onChange={handleInputChange} autoComplete="on" />
            </label>
            <label>
                <span>Group title</span>
                <input type="text" placeholder="Course code" name="grouptitle" onChange={handleInputChange} autoComplete="on" />
            </label>
            <label>
                <span>Group description</span>
                <input type="text" className="long-input" placeholder="Due date" name="groupdescription" onChange={handleInputChange} autoComplete="on" />
            </label>
            <div className="button button1" onClick={handleSubmit}><p>Add Group</p></div>
        </div>
    )
}