// BiohackMe Service Worker
const CACHE_NAME = 'biohackme-v1';
const urlsToCache = [
  '/',
  '/app',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/images/camilla-main-headshot.jpg.webp',
  '/videos/day1-compile-v5a.mp4',
  '/manifest.json'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('BiohackMe SW: Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('BiohackMe SW: Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a stream
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(() => {
          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/app');
          }
        });
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('BiohackMe SW: Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('BiohackMe SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for tracking data
self.addEventListener('sync', (event) => {
  if (event.tag === 'biohack-sync') {
    event.waitUntil(syncBiohackingData());
  }
});

// Push notifications for reminders
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Time to log your biohacking data!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Track Now',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Later',
        icon: '/icons/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('BiohackMe Reminder', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/app/tracker')
    );
  }
});

// Sync biohacking data when online
async function syncBiohackingData() {
  try {
    // Get pending data from IndexedDB
    // Sync with server
    console.log('BiohackMe SW: Syncing biohacking data');
  } catch (error) {
    console.error('BiohackMe SW: Sync failed', error);
  }
}