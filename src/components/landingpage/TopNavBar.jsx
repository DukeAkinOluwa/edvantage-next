'use client'

import { useState } from "react";
import Link from "next/link";

export default function TopNavBar(){
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

    const toggleHeaderSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };
    
    const style = {
        left: `${isSideMenuVisible ? "0px" : "-110dvw"}`
    }

    return(
        <div className="top-navbar" style={{position: "sticky"}}>
            <h3>EDVANTAGE</h3>
            <nav className="top-nav-links">
                <Link href='/LandingPage' className="home">Home</Link>
                <Link href='/About' className="about">About</Link>
                <Link href='/api/auth/login' className="login">Login</Link>
            </nav>
            <nav className="side-nav-links" style={style}>
                <Link href='/LandingPage' className="home">Home</Link>
                <Link href='/About' className="about">About</Link>
                <Link href='/api/auth/login' className="login">Login</Link>
            </nav>
            <div className="menu-btn pc-hidden" onClick={toggleHeaderSideMenu} style={{position: "absolute", left: `${isSideMenuVisible ? '84dvw' : ''}`, justifyContent: `${isSideMenuVisible ? 'center' : ''}`}}>
                <div className="line" style={{transform: `${isSideMenuVisible ? 'rotate(45deg)' : ''}`, width: `${isSideMenuVisible ? '39px' : ''}`}}></div>
                <div className="line" style={{display: `${isSideMenuVisible ? 'none' : ''}`}}></div>
                <div className="line" style={{transform: `${isSideMenuVisible ? 'rotate(135deg)' : ''}`, width: `${isSideMenuVisible ? '39px' : ''}`}}></div>
            </div>
        </div>
    )
}