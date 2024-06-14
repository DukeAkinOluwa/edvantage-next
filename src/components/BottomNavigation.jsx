import Link from "next/link";
import { useContext } from "react";
import { BottomNavContext, TopNavContext } from "@/contexts/BottomNavContext";

export default function BottomNavigation(){

    const { toggleBottomNav } = useContext(BottomNavContext);
    const { toggleTopNav } = useContext(TopNavContext);

    function handleHideTopAndBottomNav(){
        toggleBottomNav(true)
        toggleTopNav(true)
        console.log("akin")
    }

    return(
        <div className="bottom-navigator">
            <div className="cont">
                <nav className="bottom-navigator-links">
                    <Link href='/' className="nav-links"><svg className="side-menu-icon"><path d="M10 3H3V10H10V3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 3H14V10H21V3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 14H14V21H21V14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 14H3V21H10V14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg><p>Dashboard</p></Link>
                    <Link href='/Assignments' className="nav-links"><svg className="side-menu-icon"><path d="M8 21H16M12 17V21M4 3H20C21.1046 3 22 3.89543 22 5V15C22 16.1046 21.1046 17 20 17H4C2.89543 17 2 16.1046 2 15V5C2 3.89543 2.89543 3 4 3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><p>Tasks</p></Link>
                    <Link href='/Chat' className="nav-links"><svg className="side-menu-icon"><path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg><p>Chats</p></Link>
                    <Link href='/Profile' className="nav-links"><svg className="side-menu-icon"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><p>Profile</p></Link>
                    {/* <Link href='/FAQs' className="nav-links"><svg className="side-menu-icon"><path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
                    <Link href='/Profile' className="nav-links"><svg className="side-menu-icon"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></Link> */}
                </nav>
            </div>
        </div>
    )
}