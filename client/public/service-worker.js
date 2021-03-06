/* global workbox */
if (workbox) {
  self.skipWaiting(); // Update Service Worker
  console.log(`Workbox is loaded`);
  //workbox.setConfig({ debug: true });
  workbox.precaching.precacheAndRoute(self.__precacheManifest);
  workbox.routing.registerRoute( // Cache
    new RegExp('/recipes'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'Nekotastic Recipe Cache',
    }),
  );
  self.addEventListener('push', event => { // Push Notifications
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body.message,
      icon: 'img/icons/android-chrome-192x192.png',
    });
  });
} else {
  console.log(`Workbox didn't load`);
}
