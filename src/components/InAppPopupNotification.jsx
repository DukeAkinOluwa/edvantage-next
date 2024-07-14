export default function InAppPopupNotification({ popupNotificationTitle, popupNotificationText}){
    return(
        <div className="popup-notification">
            <h3>{popupNotificationTitle}</h3>
            <p>{popupNotificationText}</p>
        </div>
    )
}