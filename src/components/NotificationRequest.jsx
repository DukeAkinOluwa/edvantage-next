'use client';

import { useEffect } from 'react';
import { urlBase64ToUint8Array } from '../utils/vapidHelper';

// Replace with your actual VAPID public key
const VAPID_PUBLIC_KEY = 'BCNYiFeli6HR5FWP1lLRor3RHOPwqUiNVBhYL-S-q010mlQ6vOvSJB5rkwBVy9njEdPxvumBJWyIPIf8RtziP9g';

export default function NotificationRequest() {
  useEffect(() => {
    if ('Notification' in window && navigator.serviceWorker) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          subscribeUserToPush();
        } else {
          console.log('Notification permission denied.');
        }
      });
    }
  }, []);

  async function subscribeUserToPush() {
    const swRegistration = await navigator.serviceWorker.ready;
    const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
    const pushSubscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey
    });

    await fetch('/api/save-subscription', {
      method: 'POST',
      body: JSON.stringify(pushSubscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('User is subscribed:', pushSubscription);
  }

  return null;
}
