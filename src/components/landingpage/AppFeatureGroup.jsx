import GroupImage from "../../Images/landingpage/Group.png"

export default function AppFeatureGroup(){
    return(
        <div className="app-feature">
            <div className="right">
                <img src={GroupImage} alt="groupPhoto" />
            </div>
            <div className="left">
                <div className="feature-summary">
                    <h1>Collaboration Tools For Study Groups And Group Projects</h1>
                    <p>Enhance collaboration and productivity with our collaboration tool designed for group projects and study groups.</p>
                </div>
                <div className="feature-1">
                    <h1>Collaboration</h1>
                    <p>Work together seamlessly on group projects and study groups with our feature.</p>
                </div>
                <div className="feature-2">
                    <h1>Efficient Workflow</h1>
                    <p>Streamline your workflow and boost your productivity with our intuitive collaboration tools.</p>
                </div>
            </div>
        </div>
    )
}