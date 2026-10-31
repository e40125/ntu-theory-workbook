import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {marked} from 'marked';
import katex from 'katex';
const root=path.resolve(import.meta.dirname,'..');const out=path.join(root,'dist');
await fs.rm(out,{recursive:true,force:true});await fs.mkdir(out,{recursive:true});
export function render(md){
 const math=[];
 let source=md.replace(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g,(_,display,inline)=>{
   const html=katex.renderToString(display??inline,{displayMode:display!==undefined,throwOnError:true,trust:false,output:'htmlAndMathml'});
   const i=math.push(html)-1;return `MATHPLACEHOLDER${i}END`;
 });
 let html=marked.parse(source,{gfm:true});html=html.replace(/MATHPLACEHOLDER(\d+)END/g,(_,i)=>math[+i]);
 let n=0;html=html.replace(/<h2>(.*?)<\/h2>/g,(_,t)=>`<h2 id="section-${++n}">${t}</h2>`);
 html=html.replace(/<table>/g,'<div class="table-wrap" tabindex="0" role="region" aria-label="Scrollable table"><table>').replace(/<\/table>/g,'</table></div>');
 return html;
}
const readJSON=async name=>JSON.parse(await fs.readFile(path.join(root,'content',name+'.json'),'utf8'));
const lessons=await readJSON('lessons');
for(const l of lessons){const md=await fs.readFile(path.join(root,'content',l.id+'.md'),'utf8');l.html=render(md);l.search=(l.title+' '+l.description+' '+md).toLowerCase();}
const data={lessons,exams:await readJSON('exams'),slides:await readJSON('slides'),method:render(await fs.readFile(path.join(root,'content/method.md'),'utf8')),mock:render(await fs.readFile(path.join(root,'content/mock.md'),'utf8')),verified:'2026-11-01'};
await fs.cp(path.join(root,'src'),out,{recursive:true});await fs.cp(path.join(root,'public'),out,{recursive:true});
await fs.mkdir(path.join(out,'vendor'),{recursive:true});
await fs.copyFile(path.join(root,'node_modules/katex/dist/katex.min.css'),path.join(out,'vendor/katex.min.css'));
await fs.cp(path.join(root,'node_modules/katex/dist/fonts'),path.join(out,'vendor/fonts'),{recursive:true});
await fs.copyFile(path.join(root,'node_modules/katex/LICENSE'),path.join(out,'vendor/KaTeX-LICENSE.txt'));
await fs.writeFile(path.join(out,'content.json'),JSON.stringify(data));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
await fs.writeFile(path.join(out,'book.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Theory workbook · complete reading edition</title><link rel="stylesheet" href="style.css"><link rel="stylesheet" href="vendor/katex.min.css"></head><body class="book"><header class="book-header"><a href="./">Back to the study site</a><h1>Theory, worked through.</h1><p>Complete reading edition. Original teaching notes, checked November 1, 2026. Current exam cutoff remains unconfirmed.</p><nav aria-label="Book contents">${lessons.map(l=>`<p><a href="#${l.id}">${l.order}. ${escape(l.title)}</a></p>`).join('')}</nav></header><main>${lessons.map(l=>`<article id="${l.id}"><p class="chapter-tag">${escape(l.group)}</p><h1>${l.order}. ${escape(l.title)}</h1>${l.html}<aside class="sources"><h2>Course sources</h2>${l.sources.map(s=>`<p><a href="${s.url}">${escape(s.title)}, pages ${s.pages}</a></p>`).join('')}</aside></article>`).join('')}<article><h1>How to study with this book</h1>${data.method}</article><article><h1>Mixed practice</h1>${data.mock}</article></main></body></html>`);
const collect=async dir=>{let a=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);a.push(...(e.isDirectory()?await collect(p):[p]));}return a;};
const files=await collect(out);const hash=crypto.createHash('sha256');for(const f of files.sort())hash.update(await fs.readFile(f));const version=hash.digest('hex').slice(0,12);
await fs.writeFile(path.join(out,'version.json'),JSON.stringify({version,built:new Date().toISOString(),lessons:lessons.length,subparts:data.exams.reduce((n,e)=>n+e.items.length,0)}));
const assets=(await collect(out)).map(f=>'./'+path.relative(out,f));
await fs.writeFile(path.join(out,'sw.js'),`const CACHE='theory-${version}';const ASSETS=${JSON.stringify(assets)};
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('theory-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));return;}event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request)));});`);
await fs.writeFile(path.join(out,'.nojekyll'),'');
console.log(`Built ${lessons.length} lessons, ${data.exams.reduce((n,e)=>n+e.items.length,0)} exam subparts, version ${version}`);
