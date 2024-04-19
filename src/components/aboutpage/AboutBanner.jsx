import BannerAdorn from "../../Images/aboutpage/BannerAdorn.png"
import PCMockBackground from "../../Images/aboutpage/PCMockBackground.png"

export default function AboutBanner(){
    return(
        <div className="about-banner">
            <div className="banner-left">
                <h1>Empower Nigerian Students</h1>
                <img src={BannerAdorn} alt="Unnecessary Detail"></img>
                <p>Unleashing Potential, Fostering Community, and Simplifying Success with the Student App</p>
            </div>
            <div className="banner-right">
                <img src={PCMockBackground} alt="Unnecessary Detail"></img>
            </div>
        </div>
    )
}