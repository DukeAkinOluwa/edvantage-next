'use client'

import { useState, useEffect } from "react";

export default function DashboardBoxes() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(null);

    const sections = [
        { id: 1, content: 'Section 1' },
        { id: 2, content: 'Section 2' },
        { id: 3, content: 'Section 3' },
        { id: 4, content: 'Section 4' }
    ];

    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        setViewportWidth(window.innerWidth); // Set initial viewport width
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % sections.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [sections.length]);

    const style = {
        transform: `translateX(-${activeIndex * 100}%)`
    };

    return (
        <div className="dashboard-boxes">
            <div className="box" style={viewportWidth > 768 ? { transform: `translateX(0)` } : style}>
                <div className="dashboard-box boxa"></div>
                <div className="dashboard-box boxb"></div>
                <div className="dashboard-box boxc"></div>
                <div className="dashboard-box boxd"></div>
            </div>
        </div>
    );
}
