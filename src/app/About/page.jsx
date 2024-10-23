import AboutBanner from "@/components/aboutpage/AboutBanner";
import AboutEdvantage from "@/components/aboutpage/AboutEdvantage";
import KeyFeatures from "@/components/aboutpage/KeyFeatures";
import OurMission from "@/components/aboutpage/OurMission";
import WorkWithUs from "@/components/aboutpage/WorkWithUs";
import Footer from "@/components/landingpage/Footer";
import TopNavBar from "@/components/landingpage/TopNavBar";

export default function About(){
    return(
        <div className="about-page">
            <TopNavBar />
            <AboutBanner />
            <OurMission />
            <AboutEdvantage />
            <KeyFeatures />
            <WorkWithUs />
            <Footer />
        </div>
    )
}