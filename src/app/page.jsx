'use client'

import { useEffect } from "react"
import { getSession } from "next-auth/react"

export default function LandingPage() {
    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession()
            if (session) {
                window.location.href = "/Dashboard"
            } else {
                window.location.href = "/LandingPage"
            }
        }
        checkSession()
    }, [])

    return (
        <div className="landing-page">

        </div>
    ) // Render nothing or a loader, since redirection will occur
}
