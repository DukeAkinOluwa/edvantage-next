'use client'

import BottomNavigation from "@/components/BottomNavigation";
import GeneralHeader from "@/components/GeneralHeader";
import PageRightHeader from "@/components/PageRightHeader";
import DashboardAd from "@/components/dashboard/DashboardAd";
import DashboardBoxes from "@/components/dashboard/DashboardBoxes";
import DashboardCalendar from "@/components/dashboard/DashboardCalendar";
import DashboardGroup from "@/components/dashboard/DashboardGroups";
import DashboardTasksOverview from "@/components/dashboard/DashboardTasksOverview";
import DashboardTimeTable from "@/components/dashboard/DashboardTimeTable";
import { useState, useEffect, useRef } from "react";

export default function Home() {
    const [viewportWidth, setViewportWidth] = useState(null);
    const [topMarginValue, setTopMarginValue] = useState("");
    const [back, setBack] = useState(true);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        setViewportWidth(window.innerWidth);
        if (window.innerWidth > 655 && window.innerWidth < 1001) {
            setTopMarginValue(60);
        }

        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const currentScrollY = window.scrollY;

    //         if (currentScrollY > lastScrollY) {
    //             // Scrolling down
    //             setShowHeader(false);
    //         } else {
    //             // Scrolling up
    //             setShowHeader(true);
    //         }

    //         setLastScrollY(currentScrollY);
    //         console.log("akin")
    //     };

    //     const element = scrollContainerRef.current;
    //     if (element) {
    //         element.addEventListener('scroll', handleScroll);
    //     }

    //     return () => {
    //         if (element) {
    //             element.removeEventListener('scroll', handleScroll);
    //         }
    //     };
    // }, [lastScrollY]);

    function handleSetBack(booleanValue) {
        setBack(booleanValue);
    }
    // console.log(back)

    return (
        <>
            <section ref={scrollContainerRef} className={`dashboard-main-section ${(back && (viewportWidth > 1001)) ? "back" : ""}`}>
                <GeneralHeader handleSetBack={handleSetBack} />
                <DashboardAd />
                <DashboardBoxes />
                <DashboardCalendar />
                <DashboardTimeTable />
                <DashboardTasksOverview />
                <DashboardGroup />
                {/* {showHeader && <GeneralHeader />} */}
            </section>
            {viewportWidth < 1001 ? (
                <>
                {back && <BottomNavigation />}
                </>
            ) : (<></>
                // <PageRightHeader page_title={`Dashboard`} userlevel="23" handleSetBack={handleSetBack} topMargin={topMarginValue} />
            )}
        </>
    );
}
