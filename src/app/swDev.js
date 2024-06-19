'use client'

import { useEffect } from "react"

export default function SwDev(){

    let SW

    useEffect(() => {
        if (!navigator.serviceWorker) {
          console.warn('Service workers are not supported in this browser.');
          return;
        }
    
        try {
          navigator.serviceWorker
            .register('/sw.js', { scope: '/' })
            .then((registration) => {
              SW = registration.installing || registration.waiting || registration.active;
              console.log('SW is registered');
            })
            .catch((error) => {
              console.error('Failed to register service worker:', error);
            });
        } catch (error) {
          console.error('Error registering service worker:', error);
        }

        navigator.serviceWorker.oncontrollerchange = (ev) => {
            console.log('New SW Regd')
        }

    }, []);

    return null
}