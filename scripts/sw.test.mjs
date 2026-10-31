import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import fs from 'node:fs/promises';
test('offline manifest covers every local resource and cached navigation falls back',async()=>{const code=await fs.readFile(new URL('../dist/sw.js',import.meta.url),'utf8');const listeners={},stored=new Map();let removed=[];const context={self:{location:{origin:'https://example.com'},addEventListener:(n,f)=>listeners[n]=f,skipWaiting:async()=>{},clients:{claim:async()=>{}}},caches:{open:async()=>({addAll:async assets=>{for(const asset of assets){await fs.access(new URL('../dist/'+asset.slice(2),import.meta.url));stored.set(asset,{asset});}}}),keys:async()=>['unrelated-cache','theory-old'],delete:async key=>removed.push(key),match:async key=>stored.get(key)},fetch:async()=>{throw Error('offline');},URL};vm.runInNewContext(code,context);let work;listeners.install({waitUntil:p=>work=p});await work;assert.ok(stored.has('./content.json'));assert.ok(stored.has('./book.html'));assert.ok(stored.has('./vendor/katex.min.css'));listeners.activate({waitUntil:p=>work=p});await work;assert.deepEqual(removed,['theory-old']);let response;listeners.fetch({request:{method:'GET',url:'https://example.com/workbook/',mode:'navigate'},respondWith:p=>response=p});assert.equal((await response).asset,'./index.html');});

test('release-tagged assets bypass a previous cache and current assets still work offline',async()=>{
 const code=await fs.readFile(new URL('../dist/sw.js',import.meta.url),'utf8');
 const {version}=JSON.parse(await fs.readFile(new URL('../dist/version.json',import.meta.url),'utf8'));
 const listeners={};let network=0;
 vm.runInNewContext(code,{self:{location:{origin:'https://example.com'},addEventListener:(n,f)=>listeners[n]=f},URL,caches:{match:async(request,opts)=>opts?.ignoreSearch?{from:'current-cache'}:undefined},fetch:async()=>{network++;return {from:'network'};}});
 let response;const get=async v=>{listeners.fetch({request:{method:'GET',mode:'cors',url:'https://example.com/app.js?v='+v},respondWith:p=>response=p});return response;};
 assert.equal((await get(version)).from,'current-cache');assert.equal(network,0);
 assert.equal((await get('future-release')).from,'network');assert.equal(network,1);
 for(const file of ['index.html','book.html','mental-models.html']){
  const html=await fs.readFile(new URL('../dist/'+file,import.meta.url),'utf8');assert.ok(html.includes('style.css?v='+version),file);
  if(file==='index.html')assert.ok(html.includes('app.js?v='+version));
 }
});
