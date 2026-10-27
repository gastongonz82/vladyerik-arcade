/* VLADYERIK Retro: cache persistente de portadas. No intercepta ROMs ni emuladores. */
const CACHE='vladi-retro-cover-images-v2';
const LIMIT=240;
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{await Promise.all((await caches.keys()).filter(k=>k.startsWith('vladi-retro-cover-images-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})()));
self.addEventListener('message',event=>{
 if(event.data?.type!=='vladi-cover-failed'||typeof event.data.url!=='string')return;
 event.waitUntil(caches.open(CACHE).then(cache=>cache.delete(event.data.url)).catch(()=>{}));
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET'||req.destination!=='image')return;
 const url=new URL(req.url);
 const external=url.hostname==='thumbnails.libretro.com';
 const local=url.origin===self.location.origin&&url.pathname.includes('/assets/retro-covers/');
 if(!external&&!local)return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  const saved=await cache.match(req);
  // Las portadas propias se reemplazan en GitHub con el mismo nombre: comprobar siempre la versión publicada.
  if(!local&&saved)return saved;
  try{
   const response=await fetch(local?new Request(req,{cache:'no-store'}):req);
   if(response.ok||response.type==='opaque'){
    try{
     await cache.put(req,response.clone());
     const keys=await cache.keys();
     if(keys.length>LIMIT)await Promise.all(keys.slice(0,keys.length-LIMIT).map(key=>cache.delete(key)));
    }catch(_){}
   }
   return response;
  }catch(error){
   const fallback=await cache.match(req);
   if(fallback)return fallback;
   throw error;
  }
 })());
});
