import LibraryImage from "../../Images/landingpage/Library.png"

export default function AppFeatureLibrary(){
    return(
        <div className="app-feature">
            <div className="left">
                <div className="feature-summary">
                    <h1>Access Study Materials Anytime, Anywhere</h1>
                    <p>Our app allows you to access and download study materials, enabling you to learn without internet constraints.</p>
                </div>
                <div className="feature-1">
                    <h1>Download materials</h1>
                    <p>Save study materials for later use.</p>
                </div>
                <div className="feature-2">
                    <h1>Offline Access</h1>
                    <p>Study anywhere even without internet connection.</p>
                </div>
            </div>
            <div className="right">
                <img src={LibraryImage} alt="LibraryPhoto" />
            </div>
        </div>
    )
}