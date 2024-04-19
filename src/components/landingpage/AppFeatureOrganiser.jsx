import OrganiserImage from "../../Images/landingpage/Organiser.png"

export default function AppFeatureOrganiser(){
    return(
        <div className="app-feature">
            <div className="left">
                <div className="organiser-summary feature-summary">
                    <h1>Prioritize tasks: Focus on what's important for your academic success</h1>
                    <p>Our app helps Nigerian college student Prioritize their tasks , ensuring tey stay on top of their academic responsibilities.</p>
                </div>
                <div className="feature-1">
                    <h1>Stay organized</h1>
                    <p>Effortlessly mange your assignments, exam and study schedule.</p>
                </div>
                <div className="feature-2">
                    <h1>Collaborate efficiently</h1>
                    <p>Connect with classmates and form study groups to enhance learning and collaboration.</p>
                </div>
            </div>
            <div className="right">
                <img src={OrganiserImage} alt="OrganiserPhoto" />
            </div>
        </div>
    )
}