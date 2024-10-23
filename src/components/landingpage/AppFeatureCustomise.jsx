import Image from "next/image";

export default function AppFeatureCustomise(){
    return(
        <div className="app-feature">
            <div className="right">
                <Image src={`/Images/landingpage/Customise.png`} width={400} height={1000} alt="CustomisePhoto"></Image>
            </div>
            <div className="left">
                <div className="feature-summary">
                    <h1>Simplify your schedules with customizable timetables</h1>
                    <p>Efficiently mange your academic schedules with our user &#45; friendly app. Create personalized time tables that fits your needs.</p>
                </div>
                <div className="feature-1">
                    <h1>Easy &#45; to &#45; use</h1>
                    <p>Work together seamlessly on group projects and study groups with our feature.</p>
                </div>
                <div className="feature-2">
                    <h1>Flexible options</h1>
                    <p>Customize your timetable to include your classes, study sessions and other activities.</p>
                </div>
            </div>
        </div>
    )
}