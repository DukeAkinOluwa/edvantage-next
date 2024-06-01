'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import notification_info from "@/DB/taskdata.json"
import HNTemplate from "./templates/HNTemplate"
import Image from "next/image"

export default function GeneralHeader() {
    let imageid = "AkinProfileImage"
    let UserProfileImage = `/Images/profile/${imageid}.png`

    const [isVisible, setIsVisible] = useState(false)
    const [invisibleBackground, setInvisibleBackground] = useState(false)

    useEffect(() => {
        const handleBackButton = (event) => {
            if (isVisible) {
                event.preventDefault()
                handleRefreshClick()
                console.log("Back button clicked!")
            }
        }

        const addHistoryState = () => {
            window.history.pushState(null, "", window.location.pathname)
        }

        addHistoryState()
        window.addEventListener("popstate", handleBackButton)

        return () => {
            window.removeEventListener("popstate", handleBackButton)
        }
    }, [isVisible])

    function handleRefreshClick() {
        toggleNotification()
    }

    function toggleNotification() {
        setIsVisible(!isVisible)
        setInvisibleBackground(!invisibleBackground)
    }

    const notificationInfo = notification_info.notifications

    return (
        <div className="general-header">
            <div className="left">
                <h3>EDVANTAGE</h3>
            </div>
            <div className="right">
                <div onClick={toggleNotification}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <Link href='/Profile' aria-label="Profile Link" className="profile-image-cont">
                    <Image src={UserProfileImage} alt="ProfileImage" width={35} height={35} />
                </Link>
            </div>
            {isVisible && (
                <div className="header-popup-notification">
                    <div className="top-bar">
                        <svg className="pc-hidden" width="16" height="16" viewBox="0 0 16 16" fill="none" onClick={handleRefreshClick}>
                            <path d="M15 8H1M1 8L8 15M1 8L8 1" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h2>Notifications</h2>
                    </div>
                    {notificationInfo.map((notification, index) => (
                        <HNTemplate key={index} data={notification} />
                    ))}
                </div>
            )}
            {invisibleBackground && (
                <div className="invisible-background" onClick={toggleNotification}></div>
            )}
        </div>
    )
}