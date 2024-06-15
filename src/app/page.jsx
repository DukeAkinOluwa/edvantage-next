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
import { useState, useEffect } from "react";

export default function Home() {
  
  const [viewportWidth, setViewportWidth] = useState(null);
  const [topMarginValue, setTopMarginValue] = useState("")

  const [back, setBack] = useState(false)

  useEffect(() => {
    setViewportWidth(window.innerWidth);
    if ((window.innerWidth > 655) && (window.innerWidth < 1001)) {
      setTopMarginValue(60)
    }

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleSetBack(booleanValue){
      setBack(booleanValue)
  }
  return (
    <>
    <PageRightHeader page_title={`Dashboard`} userlevel="23" handleSetBack={handleSetBack} topMargin={topMarginValue} />
    <section className={`dashboard-main-section ${back ? "back" : ""}`}>
        <DashboardAd />
        <DashboardBoxes />
        <DashboardCalendar />
        <DashboardTimeTable />
        <DashboardTasksOverview />
        <DashboardGroup />
    </section>
    {viewportWidth < 1001 && 
      <>
        <GeneralHeader />
        <BottomNavigation />
      </>
    }
    </>
  );
}
