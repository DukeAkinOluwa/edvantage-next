import { NextResponse } from 'next/server';
import webpush from 'web-push';

// Replace with your VAPID keys
const vapidKeys = {
  publicKey: 'BCNYiFeli6HR5FWP1lLRor3RHOPwqUiNVBhYL-S-q010mlQ6vOvSJB5rkwBVy9njEdPxvumBJWyIPIf8RtziP9g',
  privateKey: 'clAGT9l81v7uG5UN0HDlhN7M5DxVWm-gklby1umodqU'
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export async function POST(request) {
  const subscription = await request.json();

  const payload = JSON.stringify({
    title: 'Test Notification',
    body: 'This is a test notification from your PWA!',
  });

  try {
    await webpush.sendNotification(subscription, payload);
    return NextResponse.json({ message: 'Notification sent' }, { status: 201 });
  } catch (error) {
    console.error('Error sending notification', error);
    return NextResponse.json({ error: 'Error sending notification' }, { status: 500 });
  }
}
