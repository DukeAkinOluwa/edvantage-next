"use client";

import { Inter } from "next/font/google";
import SideMenu from "@/components/SideMenu";
import GeneralHeader from "@/components/GeneralHeader";
import "./globals.css";
import BottomNavigation from "@/components/BottomNavigation";
import {
  BottomNavProvider,
  BottomNavContext,
  AuthContext,
  AuthProvider
} from "@/contexts/BottomNavContext";
import { useContext, useState, useEffect, lazy, Suspense } from "react";
import Login from "@/components/LoginSignup";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
      <AuthProvider>
        <BottomNavProvider>
          <html lang="en">
            <body>
              <div className="pages-wrapper">
                <Pages>{children}</Pages>
              </div>
            </body>
          </html>
        </BottomNavProvider>
      </AuthProvider>
  );
}

function Pages({ children }) {
  const [viewportWidth, setViewportWidth] = useState(null);
  const { hideBottomNav } = useContext(BottomNavContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    setViewportWidth(window.innerWidth);

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Simulate data fetching or checking for logged in state
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Replace with actual data fetching logic
    
  }, []);

  if (isLoggedIn === true) {
    console.log("true")
  }else if (isLoggedIn === null) {
    console.log("null")
  }else{
    console.log("false")
  }

  const style = {};

  const pagesStyle = hideBottomNav
    ? viewportWidth > 1000
      ? {}
      : {
          gridTemplateAreas: '"pageRight pageRight" "pageRight pageRight" "pageRight pageRight"',
        }
    : viewportWidth > 768
      ? {}
      : {};

  return (
    <div className="pages" style={pagesStyle} suppressHydrationWarning={true}>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {isLoggedIn === false && <Login />}
          {isLoggedIn === true && (
            <>
              <SideMenu />
              {!hideBottomNav && <GeneralHeader />}
              {!hideBottomNav && <BottomNavigation />}
              <div className="page-right">{children}</div>
            </>
          )}
        </>
      )}
    </div>
  );
}


// export const metadata = {
//   title: "Edvantage",
//   description: "A platform college students to organise, manage their time effectively and gain access relevant educational materials.",
//   metadataBase: new URL('https://BUESALibrary.com'),
//   // Open Graph for social media sharing
//   openGraph: {
//     url: ".",
//     title: "Edvantage - Your go-to Organiser",
//     description: "A platform college students to organise, manage their time effectively and gain access relevant educational materials.",
//     siteName: "BUESA Library",
//     images: [
//       {
//         url: "./Images/Logo.png",
//         width: 800,
//         height: 600,
//       },
//     ],
//   },
//   // Twitter card specifically
//   twitter: {
//     card: "summary_large_image",
//     site: "@Edvantage",
//     title: "Edvantage - Your go-to Organiser",
//     description: "A platform college students to organise, manage their time effectively and gain access relevant educational materials.",
//     imageUrl: "./images/Logo.png",
//   },
//   // Favicon and other optional general metadata
//   icon: './Images/Logo.png', // Replace with your favicon path relative to your project root
//   manifest: './manifest.json'
// };
