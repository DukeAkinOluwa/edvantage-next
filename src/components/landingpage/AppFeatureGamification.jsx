import Image from "next/image";
import Link from "next/link";

export default function AppFeatureGamification(){
    return(
        <div className="app-feature app-feature-gamification">
            <div className="gamification-header"><h1>Introducing Gamification</h1></div>
            <div className="left">
                <p className="large-text">Earn badges, level up, and collect tokens</p>
                <p>With our innovative gamification elements you can stay motivated and engaged. Earn badges for completing new tasks and level up.</p>
                <div className="gamification-signup">
                    <div className="button2 button"><p>Get Started</p></div>
                    <div className="button1 button"><Link href="/" className="get-started">Sign up</Link></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className="right">
                <div className="gamification-image">
                    <Image src={`/Images/landingpage/Gamification2.png`} width={400} height={1000} alt="gamificationPhoto"></Image>
                </div>
            </div>
        </div>
    )
}