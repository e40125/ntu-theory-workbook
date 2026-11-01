// Retire the workbook's offline cache. Saved local notes are not modified.
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const names=await caches.keys();
  await Promise.all(names.filter(n=>n.startsWith('theory-')).map(n=>caches.delete(n)));
  await self.clients.claim();
  await self.registration.unregister();
})()));
