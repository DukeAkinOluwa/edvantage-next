// "use client";

import { Inter } from "next/font/google";
import SideMenu from "@/components/SideMenu";
import GeneralHeader from "@/components/GeneralHeader";
import SwDev from "./swDev";
import NotificationRequest from "@/components/NotificationRequest";
import ScheduleNotification from "@/components/ScheduleNotification";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
      // <AuthProvider>
            <html lang="en">
              <head>
                <link rel="apple-touch-icon" href="/Images/Manifest/Logos/LogoIconBB144.png" />
                <meta name="apple-mobile-web-app-capable" content="#2A52BE" />
              </head>
              <body>
                <div className="pages-wrapper">
                  <Pages>{children}</Pages>
                  <SwDev />
                  <ScheduleNotification />
                  <NotificationRequest />
                  <Analytics />
                </div>
              </body>
            </html>
      // </AuthProvider>
  );
}

function Pages({ children }) {
  const isLoading = false

  const style = {};

  let pagesStyle

  return (
    <div className="pages" style={pagesStyle} suppressHydrationWarning={true}>
      <>
        <div className="page-right">{children}</div>
          <>
            <SideMenu />
            <GeneralHeader />
          </>
      </>
    </div>
  );
}


export const metadata = {
  title: "Edvantage",
  description: "A platform college students to organise, manage their time effectively and gain access relevant educational materials.",
  metadataBase: new URL('https://BUESALibrary.com'),
  // Open Graph for social media sharing
  openGraph: {
    url: ".",
    title: "Edvantage - Your go-to Organiser",
    description: "A platform college students to organise, manage their time effectively and gain access relevant educational materials.",
    siteName: "BUESA Library",
    images: [
      {
        url: "./Images/Logo.png",
        width: 800,
        height: 600,
      },
    ],
  },
  // Twitter card specifically
  twitter: {
    card: "summary_large_image",
    site: "@Edvantage",
    title: "Edvantage - Your go-to Organiser",
    description: "A platform college students to organise, manage their time effectively and gain access relevant educational materials.",
    imageUrl: "./images/Logo.png",
  },
  // Favicon and other optional general metadata
  icon: './Images/Logo.png', // Replace with your favicon path relative to your project root
  manifest: './manifest.json'
};
