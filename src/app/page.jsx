'use client'

import PageRightHeader from "@/components/PageRightHeader";
import DashboardAd from "@/components/dashboard/DashboardAd";
import DashboardBoxes from "@/components/dashboard/DashboardBoxes";
import DashboardCalendar from "@/components/dashboard/DashboardCalendar";
import DashboardGroup from "@/components/dashboard/DashboardGroups";
import DashboardTasksOverview from "@/components/dashboard/DashboardTasksOverview";
import DashboardTimeTable from "@/components/dashboard/DashboardTimeTable";
import { useState } from "react";

export default function Home() {
  const [back, setBack] = useState(false)
  function handleSetBack(booleanValue){
      setBack(booleanValue)
  }
  return (
    <>
    <PageRightHeader page_title={`Dashboard`} userlevel="23" handleSetBack={handleSetBack} />
    <section className={`dashboard-main-section ${back ? "back" : ""}`}>
        <DashboardAd />
        <DashboardBoxes />
        <DashboardCalendar />
        <DashboardTimeTable />
        <DashboardTasksOverview />
        <DashboardGroup />
    </section>
    </>
  );
}
