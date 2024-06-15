'use client'

import SideMenu from "@/components/SideMenu"
import PageRightHeader from "@/components/PageRightHeader"
import faq_info from "@/DB/faqdata.json"
import { useState, useEffect } from "react"
// import { useContext } from "react"
// import { BottomNavContext, TopNavContext } from "@/contexts/BottomNavContext";

export default function FAQs(){
    
    const faqinfo = faq_info.data
    const [viewportWidth, setViewportWidth] = useState(null)
    // const { setIsBottomNavHidden } = useContext(BottomNavContext);
    // const { setIsTopNavHidden } = useContext(TopNavContext);

    // useEffect(()=>{
    //     setIsBottomNavHidden(true)
    //     setIsTopNavHidden(true)
    // })

    useEffect(() => {
        setViewportWidth(window.innerWidth)
    }, [])

    return(
        <>
        {viewportWidth < 1001 ? <IndividualPageHeader /> : <PageRightHeader page_title={`FAQs`} userlevel="23"/>}
        {/* <PageRightHeader page_title={`FAQs`} userlevel="23"/> */}
        <div className="faq-table table">
            <div className="faq-header row">
                <div className="column1"><h5>S/N</h5></div>
                <div className="column2"><h5>Question</h5></div>
                <div className="column3"><h5>Answer</h5></div>
            </div>
            {faqinfo.map((faqs, index) => (
                <FAQTemplate key={index} data={faqs} />
            ))}
        </div>
        </>
    )
    function FAQTemplate(props){
        const data = props.data
        return(
            <div className="faq-content row">
                <div className="column column1"><h3 className="pc-hidden">S/N</h3><p>{data.sn}</p></div>
                <div className="column column2"><h3 className="pc-hidden">Question</h3><p>{data.question}</p></div>
                <div className="column column3"><h3 className="pc-hidden">Answer</h3><p>{data.answer}</p></div>
            </div>
        )
    }
  function IndividualPageHeader(){

    function handleRefreshClick(){
        window.history.back()
    }
    
    return(
        <div className="individual-page-header">
            <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            onClick={handleRefreshClick}
            >
            <path
                d="M15 8H1M1 8L8 15M1 8L8 1"
                stroke="#101828"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            </svg>
            <h2>FA&apos;s</h2>
        </div>
        )
    }
}