import { Link } from "react-router-dom"
import Logo14Short from "../../Images/Logo14Short.png"
import { useState } from "react";

export default function TopNavBar(){
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

    const toggleHeaderSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };
    return(
        <div className="top-navbar" style={{position: "relative"}}>
            <img src={Logo14Short} alt="Logo" />
            <nav className="top-nav-links">
                <Link to='/' className="home">Home</Link>
                <Link to='/About' className="about">About</Link>
                <Link to='/Contact' className="contact">Contact</Link>
                <Link to='/Login' className="login">Login</Link>
            </nav>
            <div className="menu-btn pc-hidden" onClick={toggleHeaderSideMenu} style={{position: "absolute", left: `${isSideMenuVisible ? '84dvw' : ''}`, justifyContent: `${isSideMenuVisible ? 'center' : ''}`}}>
                <div className="line" style={{transform: `${isSideMenuVisible ? 'rotate(45deg)' : ''}`, width: `${isSideMenuVisible ? '39px' : ''}`}}></div>
                <div className="line" style={{display: `${isSideMenuVisible ? 'none' : ''}`}}></div>
                <div className="line" style={{transform: `${isSideMenuVisible ? 'rotate(135deg)' : ''}`, width: `${isSideMenuVisible ? '39px' : ''}`}}></div>
            </div>
            <div className={`header-side-menu ${isSideMenuVisible ? 'visible' : ''}`}>
                <nav className="slide-menu-links">
                    <div className="space">
                        <img src={Logo14Short} alt="Logo" />
                    </div>
                    <Link to='/' className="home">Home</Link>
                    <Link to='/About' className="about">About</Link>
                    <Link to='/Contact' className="contact">Contact</Link>
                    <Link to='/Login' className="login">Login</Link>
                    {/* <Link to='/Dashboard' className="contact">Dashboard</Link> */}
                </nav>
            </div>
            {/* <div className="cancel-menu-btn pc-hidden" onClick={toggleHeaderSideMenu} style={{display: `${isSideMenuVisible ? 'flex' : 'none'}`, position: `${isSideMenuVisible ? 'absolute' : 'fixed'}`}}></div> */}
        </div>
    )
}