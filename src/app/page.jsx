'use client'

import AppFeatureLibrary from "@/components/landingpage/AppFeatureLibrary"
import TopNavBar from "@/components/landingpage/TopNavBar"
import LandingBanner from "@/components/landingpage/LandingBanner"
import AppFeatureGroup from "@/components/landingpage/AppFeatureGroup"
import AppFeatureOrganiser from "@/components/landingpage/AppFeatureOrganiser"
import AppFeatureCustomise from "@/components/landingpage/AppFeatureCustomise"
import AppFeatureGamification from "@/components/landingpage/AppFeatureGamification"
import LandingTestimonial from "@/components/landingpage/LandingTestimonial"
import Footer from "@/components/landingpage/Footer"

export default function LandingPage(){
    return(
        <div className="landing-page">
            <TopNavBar />
            <LandingBanner />
            <section className="app-features">
                <h1 className="heading">What We Offer</h1>
                <AppFeatureLibrary />
                <AppFeatureGroup />
                <AppFeatureOrganiser />
                <AppFeatureCustomise />
                <AppFeatureGamification />
                <LandingTestimonial />
            </section>
            <Footer />
        </div>
    )
}