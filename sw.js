const STR_CACHE_NAME = 'site-static';
const assets = [
  '/',
  '/home',
  '/movies',
  '/shows',
  '/not-found',
  '/src/img/not-found/page-not-found.png',
  'https://fonts.googleapis.com/css?family=Material+Icons&display=block',
  'https://fonts.googleapis.com/css?family=Material+Icons+Outlined&display=block',
  '/src/img/favicon'
];

//install service worker
self.addEventListener('install', evt => {
  //console.log("service worker has been installed");
  evt.waitUntil(
    caches.open(STR_CACHE_NAME).then( cache => {
      cache.addAll(assets)
    })
  );
})

//active worker
self.addEventListener('activate', evt => {
  //console.log("service worker has been activated");
})

//fetch event listener
self.addEventListener('fetch', evt => {
  //console.log('fetch event');

  evt.respondWith(
    caches.match(evt.request).then( cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  )
})