const CACHE_NAME = 'lab-pwa-v1';
const FILES_TO_CACHE = [
  './',
  './assets/css/bundle.css',
  './assets/js/bundle.js',
];

function updateCache() {
  return caches.open(CACHE_NAME).then((cache) => {
//    return cache.addAll(FILES_TO_CACHE);
  });
}

self.addEventListener('install', (ev) => {
  ev.waitUntil(updateCache());
});

self.addEventListener('fetch', (ev) => {
  ev.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(ev.request).then((res) => {
        return res || fetch(ev.request);
      });
    })
  );
});

self.addEventListener('message', (ev) => {
  const message = ev.data;

  if (message.type === 'UPDATE_CACHE') {
    updateCache().then(() => {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({type: 'COMPLETE_UPDATING_CACHE'});
        });
      });
    });
  }
});

self.addEventListener('push', (ev) => {
  let json = ev.data.json();
  let baseURL = json.data.url;

  ev.waitUntil(
    self.registration.showNotification(
      json.notification.title, {
        'body': json.notification.body,
        'tag': 'request',
        'actions': JSON.parse(json.data.action)
      }
    )
  );
});

self.addEventListener('notificationclick', (ev) => {
  if (ev.action === 'select-a') {
    self.clients.openWindow('http://yahoo.co.jp');
  } else if (event.action === 'select-b') {
    self.clients.openWindow('http://google.com');
  } else {
    self.clients.openWindow(baseURL);
  }

  ev.notification.close();
});
