'use client';

import { useEffect } from 'react';

export default function ScheduleNotification() {
    useEffect(() => {
        if ('serviceWorker' in navigator && 'Notification' in window) {
        navigator.serviceWorker.ready.then(registration => {
            const title = 'Reminder';
            const options = {
            body: 'This is a reminder notification!',
            icon: '/Images/Logo.jpg',
            badge: '/Images/Logo.jpg',
            tag: 'reminder-notification'
            };

            registration.showNotification(title, options);
        });
        }
    }, []);

    return null;
}
