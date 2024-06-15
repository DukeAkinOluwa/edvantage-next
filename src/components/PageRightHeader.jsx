'use client'
import Ellipse from "@/icons/Badges-Medals-Trophies/Ellipse"
import TrophyStar from "@/icons/Badges-Medals-Trophies/TropyStar"
import SilverMedal from "@/icons/Badges-Medals-Trophies/SilverMedal"

export default function PageRightHeader(props){
    const userlevel = props.userlevel
    const topMargin = props.topMargin
    return(
        <div className="page-right-header" style={{marginTop: `${topMargin}px`}}>
            <div className="page-right-header-b">
                <h3>{props.page_title}</h3>
                <section className="progress-status">
                    <p>Level {userlevel}/100</p>
                    <UserProgressDiv text="200" bordercolor="FF6B6B" svg={"Ellipse"} />
                    <UserProgressDiv text="Basic" bordercolor="2A52BE" svg={"SilverMedal"} />
                    <UserProgressDiv text="Triumph" bordercolor="FFD700" svg={"TrophyStar"} />
                </section>
            </div>
        </div>
    )
    function UserProgressDiv(props){
    
        const text = props.text
        let bordercolor = "#" + props.bordercolor
        let svg = props.svg
        let styles = {
            borderColor: bordercolor
        }
    
        return(
            <div className="progress-div" style={styles}>
                {svg === "Ellipse" && <Ellipse />}
                {svg === "TrophyStar" && <TrophyStar />}
                {svg === "SilverMedal" && <SilverMedal />}
                <p>{text}</p>
            </div>
        )
    }
}