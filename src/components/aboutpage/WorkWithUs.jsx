import WorkWithUsImage from "../../Images/aboutpage/WorkWithUsImage.png"

export default function WorkWithUs(){
    return(
        <div className="work-with-us">
            <h1 className="feature-header">Work with us</h1>
            <p>Together we can impact how ed tech works</p>
            <div className="card">
                <div className="work-with-us-descrip">
                    <h1>Partner with us</h1>
                    <p>Want to help tackle the tough issues that have troubled the education system for decades? Join us and have some fun while making a positive impact!</p>
                </div>
                <div className="work-with-us-image">
                    <img src={WorkWithUsImage} alt="AnimatedImage"></img>
                </div>
            </div>
        </div>
    )
}