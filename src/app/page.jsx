'use client'

import BottomNavigation from "@/components/BottomNavigation";
import GeneralHeader from "@/components/GeneralHeader";
import InAppPopupNotification from "@/components/InAppPopupNotification";
import PageRightHeader from "@/components/PageRightHeader";
import DashboardAd from "@/components/dashboard/DashboardAd";
import DashboardBoxes from "@/components/dashboard/DashboardBoxes";
import DashboardCalendar from "@/components/dashboard/DashboardCalendar";
import DashboardGroup from "@/components/dashboard/DashboardGroups";
import DashboardTasksOverview from "@/components/dashboard/DashboardTasksOverview";
import DashboardTimeTable from "@/components/dashboard/DashboardTimeTable";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [state, setState] = useState({
    viewportWidth: null,
    topMarginValue: "",
    back: true,
    showHeader: true,
    lastScrollY: 0,
    popupNotificationTitle: "",
    popupNotificationText: "",
    popupHeight: false
  });

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setState(prevState => ({
        ...prevState,
        viewportWidth: window.innerWidth
      }));
      if (window.innerWidth > 655 && window.innerWidth < 1001) {
        setState(prevState => ({
          ...prevState,
          topMarginValue: "60"
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        popupHeight: false
      }));
    }, 4000); // 4 seconds

    return () => clearTimeout(timeout);
  }, [state.popupHeight]);

  function handleSetBack(booleanValue) {
    setState(prevState => ({
      ...prevState,
      back: booleanValue
    }));
  }

  function handleShowPopupNotification(title, text, pheight) {
    setState(prevState => ({
      ...prevState,
      popupNotificationTitle: title,
      popupNotificationText: text,
      popupHeight: pheight
    }));
  }

  return (
    <>
      <section
        ref={scrollContainerRef}
        className={`dashboard-main-section ${
          state.back && state.viewportWidth > 1001 ? "back" : ""
        }`}
      >
        <GeneralHeader handleSetBack={handleSetBack} />
        <DashboardAd />
        <DashboardBoxes />
        <DashboardCalendar />
        <DashboardTimeTable handleShowPopupNotification={handleShowPopupNotification} />
        <DashboardTasksOverview handleShowPopupNotification={handleShowPopupNotification} />
        <DashboardGroup />
      </section>
      {state.viewportWidth < 1001 ? (
        <>{state.back && <BottomNavigation />}</>
      ) : (
        <></>
      )}
      <InAppPopupNotification
        popupNotificationText={state.popupNotificationText}
        popupNotificationTitle={state.popupNotificationTitle}
        popupHeight={state.popupHeight}
      />
    </>
  );
}
