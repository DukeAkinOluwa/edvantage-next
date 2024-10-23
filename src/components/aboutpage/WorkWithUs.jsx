import Image from "next/image";

export default function WorkWithUs(){
    return(
        <div className="work-with-us">
            <h1 className="feature-header">Work with us</h1>
            <p>Together we can impact how ed tech works</p>
            <div className="card">
                <div className="work-with-us-descrip">
                    <h1>Partner with us</h1>
                    <p>Want to help tackle the tough issues that have troubled the education system for decades&#63; Join us and have some fun while making a positive impact&#33;</p>
                </div>
                <div className="work-with-us-image">
                <Image src={`/Images/aboutpage/WorkWithUsImage.png`} className="work-with-us-image" width={400} height={1000} alt="AnimatedImage"></Image>
                </div>
            </div>
        </div>
    )
}