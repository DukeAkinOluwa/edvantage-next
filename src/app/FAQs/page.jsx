'use client'

import SideMenu from "@/components/SideMenu"
import PageRightHeader from "@/components/PageRightHeader"
import faq_info from "@/DB/faqdata.json"

export default function FAQs(){
    
    const faqinfo = faq_info.data

    return(
        <>
        <PageRightHeader page_title={`FAQs`} userlevel="23"/>
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
}