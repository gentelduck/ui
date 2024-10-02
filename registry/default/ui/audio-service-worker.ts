// public/service-worker.js
self.addEventListener('install', event => {
  console.log('Service Worker: Installed')
})

self.addEventListener('activate', event => {
  console.log('Service Worker: Activated')
})

self.addEventListener('fetch', event => {
  if (event.request.destination === 'audio') {
    event.respondWith(handleAudioRequest(event.request))
  }
})

const handleAudioRequest = async request => {
  const response = await fetch(request)
  const blob = await response.blob()

  // You can perform any processing on the blob here
  // For example, cache it or send it to the main thread
  return blob
}
