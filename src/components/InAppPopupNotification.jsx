export default function InAppPopupNotification({ popupNotificationTitle, popupNotificationText}){
    const style={
        height: "0px",
        padding: "0px"
    }
    return(
        <div className="popup-notification" style={((popupNotificationText.length <= 0) && (popupNotificationTitle.length <= 0)) ? style : {}}>
            <h3>{popupNotificationTitle}</h3>
            <p>{popupNotificationText}</p>
        </div>
    )
}