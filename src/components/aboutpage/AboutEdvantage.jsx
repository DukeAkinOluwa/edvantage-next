import Image from "next/image";

export default function AboutEdvantage(){
    return(
        <div className="about-edvantage">
            <div className="who-we-are-descrip">
                <h1 className="header-text">Who We Are</h1>
                <p>We are a dedicated team of developers, designers, and educators passionate about creating solutions that address the unique challenges faced by Nigerian college students. Our diverse backgrounds and experiences converge to build an app that reflects the vibrancy and dynamism of the student community.</p>
            </div>
            <div className="who-we-are-image">
                <Image src={`/Images/aboutpage/WhoWeAreImage.png`} width={400} height={1000} alt=""></Image>
            </div>
            <div className="what-drives-us-descrip">
                <h1 className="header-text">What Drives Us</h1>
                <p>Understanding the demands and aspirations of students in Nigeria is at the core of our work. We strive to create an app that not only meets the functional needs of academic life but also resonates with the sense of community, motivation, and achievement that defines the student journey.</p>
            </div>
            <div className="what-drives-us-image">
                <Image src={`/Images/aboutpage/WhatDrivesUsImage.png`} width={400} height={1000} alt=""></Image>
            </div>
        </div>
    )
}