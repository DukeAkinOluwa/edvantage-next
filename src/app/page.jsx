'use client'

import { useEffect } from "react"
import { getSession } from "next-auth/react"

export default function LandingPage() {
    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession()
            if (session) {
                window.location.href = "http://edvantage.com.ng/Dashboard"
            } else {
                window.location.href = "http://edvantage.com.ng/LandingPage"
            }
        }
        checkSession()
    }, [])

    return (
        <div className="landing-page">

        </div>
    ) // Render nothing or a loader, since redirection will occur
}
