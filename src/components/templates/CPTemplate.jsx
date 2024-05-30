// CPTemplate.js
import React from "react";
import Image from "next/image";

export default function CPTemplate({ data, onUserProfileClick }) {
  const handleClick = () => {
    onUserProfileClick(data);
  };

  const { title, lasttext, imageid } = data;
  
  let UserProfileImage = `/Images/profile/${imageid}`

  return (
    <div className="chat-profile row" onClick={handleClick}>
      <div className="column1">
        <Image src={UserProfileImage} alt={`Chat ${title}`} width={50} height={50} />
      </div>
      <div className="column2">
        <h4>{title}</h4>
        <p className="time">{lasttext}</p>
      </div>
    </div>
  );
}