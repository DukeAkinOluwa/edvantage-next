import Image from "next/image";

export default function AboutBanner(){
    return(
        <div className="about-banner">
            <div className="banner-left">
                <h1>Empower Nigerian Students</h1>
                <Image src={`/Images/aboutpage/BannerAdorn.png`} width={1000} height={40} alt="Unnecessary Detail"></Image>
                <p>Unleashing Potential, Fostering Community, and Simplifying Success with the Student App</p>
            </div>
            <div className="banner-right">
                <Image src={`/Images/aboutpage/PCMockBackground.png`} width={1000} height={250} alt="Unnecessary Detail"></Image>
            </div>
        </div>
    )
}