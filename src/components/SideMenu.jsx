'use client'

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/contexts/BottomNavContext"
import Link from "next/link";
import { signOut } from 'next-auth/react';

export default function SideMenu() {
  const [activeLink, setActiveLink] = useState(null)
  const { logout } = useContext(AuthContext)
  // useEffect(() => {
  //   const currentPath = location.pathname;
  //   if(currentPath === "/"){
  //     setActiveLink(1)
  //   }else if(currentPath === "/Assignments"){
  //     setActiveLink(2)
  //   }else if(currentPath === "/Examinations"){
  //     setActiveLink(3)
  //   }else if(currentPath === "/Progress"){
  //     setActiveLink(4)
  //   }else if(currentPath === "/Chat"){
  //     setActiveLink(5)
  //   }else if(currentPath === "/Settings"){
  //     setActiveLink(6)
  //   }else if(currentPath === "/FAQs"){
  //     setActiveLink(7)
  //   }else if(currentPath === "/Profile"){
  //     setActiveLink(8)
  //   }
  // }, []);

  // Logout Function
  const handleLogout = () => {
    logout(false)
    console.log("a")
  };

  return (
    <div className="side-menu">
      <nav>
        <Link href="/Dashboard" className={`nav-links ${activeLink === 1 ? "active": ""}`} onClick={() => setActiveLink(1)}>
          <svg className="side-menu-icon">
            <path
              d="M10 3H3V10H10V3Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 3H14V10H21V3Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 14H14V21H21V14Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 14H3V21H10V14Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Dashboard</p>
        </Link>
        <Link href="/Assignments" className={`nav-links ${activeLink === 2 ? "active": ""}`} onClick={() => setActiveLink(2)}>
          <svg className="side-menu-icon">
            <path
              d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20M4 19.5C4 20.163 4.26339 20.7989 4.73223 21.2678C5.20107 21.7366 5.83696 22 6.5 22H20V2H6.5C5.83696 2 5.20107 2.26339 4.73223 2.73223C4.26339 3.20107 4 3.83696 4 4.5V19.5Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Assignments</p>
        </Link>
        <Link href="/Examinations" className={`nav-links ${activeLink === 3 ? "active": ""}`} onClick={() => setActiveLink(3)}>
          <svg className="side-menu-icon">
            <path
              d="M12 7C12 5.93913 11.5786 4.92172 10.8284 4.17157C10.0783 3.42143 9.06087 3 8 3H2V18H9C9.79565 18 10.5587 18.3161 11.1213 18.8787C11.6839 19.4413 12 20.2044 12 21M12 7V21M12 7C12 5.93913 12.4214 4.92172 13.1716 4.17157C13.9217 3.42143 14.9391 3 16 3H22V18H15C14.2044 18 13.4413 18.3161 12.8787 18.8787C12.3161 19.4413 12 20.2044 12 21"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Examinations</p>
        </Link>
        <Link href="/Progress" className={`nav-links ${activeLink === 4 ? "active": ""}`} onClick={() => setActiveLink(4)}>
          <svg className="side-menu-icon">
            <path
              d="M8 21H16M12 17V21M4 3H20C21.1046 3 22 3.89543 22 5V15C22 16.1046 21.1046 17 20 17H4C2.89543 17 2 16.1046 2 15V5C2 3.89543 2.89543 3 4 3Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Progress</p>
        </Link>
        <Link href="/Chat" className={`nav-links ${activeLink === 5 ? "active": ""}`} onClick={() => setActiveLink(5)}>
          <svg className="side-menu-icon">
            <path
              d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Chat</p>
        </Link>
        <Link href="/FAQs" className={`nav-links ${activeLink === 7 ? "active": ""}`} onClick={() => setActiveLink(7)}>
          <svg className="side-menu-icon">
            <path
              d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>FAQs</p>
        </Link>
        <Link href="/Profile" className={`nav-links ${activeLink === 8 ? "active": ""}`} onClick={() => setActiveLink(8)}>
          <svg className="side-menu-icon">
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>User Profile</p>
        </Link>
      </nav>
      <div onClick={() => signOut()} className="side-menu-logout">Logout</div>
    </div>
  );
}
