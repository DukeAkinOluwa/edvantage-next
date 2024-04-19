export default function FAQTemplate(props){

    const data = props.data
    // let status = data.status
    // let statusbackgroungcolour
    
    // ((status === "Completed") ? statusbackgroungcolour = "#DEF9DD" : statusbackgroungcolour = "#FFD70033" );
    // let status_background = {
    //     backgroundColor: statusbackgroungcolour
    // }

    return(
        <div className="faq-content row">
            <div className="column column1"><h3 className="pc-hidden">S/N</h3><p>{data.sn}</p></div>
            <div className="column column2"><h3 className="pc-hidden">Question</h3><p>{data.question}</p></div>
            <div className="column column3"><h3 className="pc-hidden">Answer</h3><p>{data.answer}</p></div>
        </div>
    )
}