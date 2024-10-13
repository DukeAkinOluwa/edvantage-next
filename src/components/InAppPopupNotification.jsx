export default function InAppPopupNotification({ popupNotificationTitle, popupNotificationText, popupHeight }){
    const style={
        height: "0px",
        padding: "0px"
    }
    return(
        <div className="popup-notification" style={( popupHeight === false ) ? style : {}}>
            <h3>{popupNotificationTitle}</h3>
            <p>{popupNotificationText}</p>
        </div>
    )
}