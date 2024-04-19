import WhoWeAreImage from "../../Images/aboutpage/WhoWeAreImage.png"
import WhatDrivesUsImage from "../../Images/aboutpage/WhatDrivesUsImage.png"

export default function AboutEdvantage(){
    return(
        <div className="about-edvantage">
            <div className="who-we-are-descrip">
                <h1 className="header-text">Who We Are</h1>
                <p>We are a dedicated team of developers, designers, and educators passionate about creating solutions that address the unique challenges faced by Nigerian college students. Our diverse backgrounds and experiences converge to build an app that reflects the vibrancy and dynamism of the student community.</p>
            </div>
            <div className="who-we-are-image">
                <img src={WhoWeAreImage} alt="AnimatedImage"></img>
            </div>
            <div className="what-drives-us-descrip">
                <h1 className="header-text">What Drives Us</h1>
                <p>Understanding the demands and aspirations of students in Nigeria is at the core of our work. We strive to create an app that not only meets the functional needs of academic life but also resonates with the sense of community, motivation, and achievement that defines the student journey.</p>
            </div>
            <div className="what-drives-us-image">
                <img src={WhatDrivesUsImage} alt="AnimatedImage"></img>
            </div>
        </div>
    )
}