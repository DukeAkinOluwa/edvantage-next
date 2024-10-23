import Image from "next/image";

export default function AppFeatureOrganiser() {
    return (
        <div className="app-feature">
            <div className="left">
                <div className="organiser-summary feature-summary">
                    <h1>Prioritize tasks: Focus on what&apos;s important for your academic success</h1>
                    <p>Our app helps Nigerian college students prioritize their tasks, ensuring they stay on top of their academic responsibilities.</p>
                </div>
                <div className="feature-1">
                    <h1>Stay organized</h1>
                    <p>Effortlessly manage your assignments, exams, and study schedule.</p>
                </div>
                <div className="feature-2">
                    <h1>Collaborate efficiently</h1>
                    <p>Connect with classmates and form study groups to enhance learning and collaboration.</p>
                </div>
            </div>
            <div className="right">
                <Image src={`/Images/landingpage/Organiser.png`} width={400} height={1000} alt="OrganiserPhoto"></Image>
            </div>
        </div>
    )
}