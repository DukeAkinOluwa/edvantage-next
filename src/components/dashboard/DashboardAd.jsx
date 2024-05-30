import Image from "next/image"

export default function DashboardAd(){
    return(
        <>
            <div className="dashboard-ad-background">
                <div className="dashboard-ad-text">
                    <h5 className="ad-text-header">
                        Improve your academic performance
                    </h5>
                    <p className="ad-text-paragraph">
                        we have found a new and easier learning process
                    </p>
                </div>
                <Image src={`/Images/img1.png`} alt="image1" width={250} height={180} sizes="auto, (max-height: 90%)" />
            </div>
        </>
    )
}