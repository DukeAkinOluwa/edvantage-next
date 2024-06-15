'use client'

import Image from "next/image"
import Link from "next/link"
// import { useEffect, useContext } from "react"
// import { BottomNavContext, TopNavContext } from "@/contexts/BottomNavContext";

export default function Profile(){

    // const { setIsBottomNavHidden } = useContext(BottomNavContext);
    // const { setIsTopNavHidden } = useContext(TopNavContext);

    let imageid = "AkinProfileImage"
    let UserProfileImage = `/Images/profile/${imageid}.png`

    // useEffect(()=>{
    //     setIsBottomNavHidden(true)
    //     setIsTopNavHidden(true)
    // })

    return(
        <div className="profile-page">
            <IndividualPageHeader />
                <div className="body">
                <div className="profile-card">
                    <div className="profile-image-cont">
                        <Image src={UserProfileImage} alt="ProfileImage" width={75} height={75} />
                    </div>
                    <h2>AkinOluwa</h2>
                    <h3>Bells University Of Technology</h3>
                    <p>Mechatronics Engineering | 300L</p>
                </div>
                <div className="links">
                    <Link href="/Settings">Settings</Link>
                    <Link href="/FAQs">FAQs</Link>
                    <Link href="/TermsAndConditions">Terms &amp; Conditions</Link>
                </div>
            </div>
        </div>
    )
    function IndividualPageHeader(){
  
      function handleRefreshClick(){
        window.history.back()
      }
      
      return(
        <div className="individual-page-header">
          <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            onClick={handleRefreshClick}
          >
            <path
              d="M15 8H1M1 8L8 15M1 8L8 1"
              stroke="#101828"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2>Profile</h2>
        </div>
      )
    }
}