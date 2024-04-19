// CPTemplate.js
import React from "react";

export default function CPTemplate({ data, onUserProfileClick }) {
  const handleClick = () => {
    onUserProfileClick(data);
  };

  const { title, lasttext, imageid } = data;
  
  let UserProfileImage = `./Images/profile/${imageid}`

  return (
    <div className="chat-profile row" onClick={handleClick}>
      <div className="column1">
        <img src={UserProfileImage} alt={`Chat ${title}`} />
      </div>
      <div className="column2">
        <h4>{title}</h4>
        <p className="time">{lasttext}</p>
      </div>
    </div>
  );
}
