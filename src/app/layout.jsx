import { Inter } from "next/font/google";
import SideMenu from "@/components/SideMenu";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="pages">
          <SideMenu />
          <div className={`page-right `}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
