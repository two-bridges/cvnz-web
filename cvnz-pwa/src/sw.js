//source article - https://karannagupta.com/using-custom-workbox-service-workers-with-create-react-app/

 if ('function' === typeof importScripts) {
   importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
/* global workbox */
if (workbox) {
  console.log('Workbox is loaded');

  /* injection point for manifest files.  */
  workbox.precaching.precacheAndRoute([]);

  /* custom cache rules*/
  workbox.routing.registerNavigationRoute('/index.html', {
    blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
  });

  workbox.routing.registerRoute(
    /\.(?:png|svg|ico|gif|jpg|jpeg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  );

} else {
  console.log('Workbox could not be loaded. No Offline support');
}
 }


