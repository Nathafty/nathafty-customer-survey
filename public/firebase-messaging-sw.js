// Firebase messaging service worker — not used in this project.
// This file exists to prevent 500 errors from browsers that request it.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => {});
