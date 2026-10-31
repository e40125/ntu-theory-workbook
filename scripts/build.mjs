import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {marked} from 'marked';
import katex from 'katex';
const root=path.resolve(import.meta.dirname,'..');const out=path.join(root,'dist');
await fs.rm(out,{recursive:true,force:true});await fs.mkdir(out,{recursive:true});
export function render(md,prefix="section"){
 const math=[];
 let source=md.replace(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g,(_,display,inline)=>{
   const html=katex.renderToString(display??inline,{displayMode:display!==undefined,throwOnError:true,trust:false,output:'htmlAndMathml'});
   const i=math.push(html)-1;return `MATHPLACEHOLDER${i}END`;
 });
 let html=marked.parse(source,{gfm:true});html=html.replace(/MATHPLACEHOLDER(\d+)END/g,(_,i)=>math[+i]);
 let n=0;html=html.replace(/<h2>(.*?)<\/h2>/g,(_,t)=>`<h2 id="${prefix}-${++n}">${t}</h2>`);
 html=html.replace(/<table>/g,'<div class="table-wrap" tabindex="0" role="region" aria-label="Scrollable table"><table>').replace(/<\/table>/g,'</table></div>');
 return html;
}
const readJSON=async name=>JSON.parse(await fs.readFile(path.join(root,'content',name+'.json'),'utf8'));
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const models=await readJSON('models');
const coverage=await readJSON('coverage');
for(const m of models){
 const md=await fs.readFile(path.join(root,'content/models',m.id+'.md'),'utf8');
 m.coverage=coverage.find(c=>c.id===m.id);
 if(!m.coverage)throw new Error('Missing coverage for '+m.id);
 const pageMap=`<details class="coverage-map"><summary>Follow the source pages · concepts in this deck</summary><ul>${m.coverage.sections.map(s=>`<li><a href="${m.url.replace(/#page=\d+$/,'')}#page=${s.from}">PDF ${s.from===s.to?'page '+s.from:'pages '+s.from+'–'+s.to}</a>: ${escape(s.concepts)}</li>`).join('')}</ul><p class="small">Page map for this explanation; supplementary examples and source corrections are identified in the prose. Reading coverage does not establish mastery.</p></details>`;
 m.html=pageMap+render(md.replace(/^# .*\n/,''),'model-'+m.id);
 m.search=(m.title+' '+m.file+' '+md).toLowerCase();
 m.words=md.split(/\s+/).length;
}
const lessons=await readJSON('lessons');
for(const l of lessons){
 const md=await fs.readFile(path.join(root,'content',l.id+'.md'),'utf8');
 const primary=models.find(m=>m.id===l.modelIds[0]);
 const lead=primary.html.replaceAll('id="model-','id="'+l.id+'-model-');
 l.html=`<section class="model-first" aria-label="Build the mental model"><p class="eyeline">First, build the mental model</p><p class="note">${escape(primary.title)} · <a href="${primary.url}">${escape(primary.file)}, pages ${primary.pages}</a></p>${lead}<p class="model-bridge">Now use that model in the worked lesson below. For a missing link, <a href="./#models">open the whole-course map</a>.</p></section><section class="worked-lesson" aria-label="Worked lesson and practice">${render(md,l.id+'-section')}</section>`;
 l.search=(l.title+' '+l.description+' '+md+' '+primary.search).toLowerCase();
}
const data={lessons,models,modelOverview:render(await fs.readFile(path.join(root,'content/model-overview.md'),'utf8'),'overview'),exams:await readJSON('exams'),slides:await readJSON('slides'),method:render(await fs.readFile(path.join(root,'content/method.md'),'utf8'),'method'),mock:render(await fs.readFile(path.join(root,'content/mock.md'),'utf8'),'mock'),verified:'2026-11-01'};
await fs.cp(path.join(root,'src'),out,{recursive:true});await fs.cp(path.join(root,'public'),out,{recursive:true});
await fs.mkdir(path.join(out,'vendor'),{recursive:true});
await fs.copyFile(path.join(root,'node_modules/katex/dist/katex.min.css'),path.join(out,'vendor/katex.min.css'));
await fs.cp(path.join(root,'node_modules/katex/dist/fonts'),path.join(out,'vendor/fonts'),{recursive:true});
await fs.copyFile(path.join(root,'node_modules/katex/LICENSE'),path.join(out,'vendor/KaTeX-LICENSE.txt'));
await fs.writeFile(path.join(out,'content.json'),JSON.stringify(data));
await fs.writeFile(path.join(out,'book.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Theory workbook · complete reading edition</title><link rel="stylesheet" href="style.css"><link rel="stylesheet" href="vendor/katex.min.css"></head><body class="book"><header class="book-header"><a href="./">Back to the study site</a><h1>Theory, worked through.</h1><p>Worked reading edition, now with a mental model before each lesson. <a href="mental-models.html">Read all 49 deck guides and the whole-course map</a>. Checked November 1, 2026; the exact exam cutoff remains unconfirmed.</p><nav aria-label="Book contents">${lessons.map(l=>`<p><a href="#${l.id}">${l.order}. ${escape(l.title)}</a></p>`).join('')}</nav></header><main>${lessons.map(l=>`<article id="${l.id}"><p class="chapter-tag">${escape(l.group)}</p><h1>${l.order}. ${escape(l.title)}</h1>${l.html}<aside class="sources"><h2>Course sources</h2>${l.sources.map(s=>`<p><a href="${s.url}">${escape(s.title)}, pages ${s.pages}</a></p>`).join('')}</aside></article>`).join('')}<article><h1>How to study with this book</h1>${data.method}</article><article><h1>Mixed practice</h1>${data.mock}</article></main></body></html>`);
const sourceLinks=m=>`<p class="small"><a href="${m.url}">Original ${escape(m.file)} · PDF pages ${m.pages}</a> · ${escape(m.group)}</p>`;
await fs.writeFile(path.join(out,'mental-models.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>49 deck mental models · Theory workbook</title><link rel="stylesheet" href="style.css"><link rel="stylesheet" href="vendor/katex.min.css"></head><body class="book"><a class="skip-link" href="#mental-map">Skip to the mental map</a><header class="book-header"><a href="./#models">Open the searchable guide</a><h1>Build the whole picture.</h1><p>49 source-linked deck guides. First-principles explanations in connected rounds: purpose → mechanism → complete example → notation → justification → connection. Later decks are included for continuity; inclusion does not establish Midterm 2 scope.</p><details><summary>Choose a deck · all 49 guides</summary><nav aria-label="Deck contents">${models.map(m=>`<p><a href="#${m.id}">${m.order}. ${escape(m.title)}</a></p>`).join('')}</nav></details></header><main><article id="mental-map" class="article-body">${data.modelOverview}</article>${models.map((m,i)=>`<article id="${m.id}" class="article-body"><p class="chapter-tag">Deck ${m.order} / ${models.length}</p><h1>${escape(m.title)}</h1>${sourceLinks(m)}${m.html}<nav class="next-lesson" aria-label="Adjacent decks">${i?`<a href="#${models[i-1].id}">Previous deck</a>`:'<a href="#mental-map">Whole-course map</a>'}${i<models.length-1?`<a href="#${models[i+1].id}">Next: ${escape(models[i+1].title)}</a>`:'<a href="#mental-map">Return to the whole picture</a>'}</nav></article>`).join('')}</main></body></html>`);
const collect=async dir=>{let a=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);a.push(...(e.isDirectory()?await collect(p):[p]));}return a;};
const files=await collect(out);const hash=crypto.createHash('sha256');hash.update(await fs.readFile(import.meta.filename));for(const f of files.sort())hash.update(await fs.readFile(f));const version=hash.digest('hex').slice(0,12);
// A fresh HTML navigation must not mix the new shell with a prior service worker's cached app/content.
for(const name of ['index.html','book.html','mental-models.html']){
 const file=path.join(out,name);let html=await fs.readFile(file,'utf8');
 html=html.replace(/(src|href)="(app\.js|style\.css|vendor\/katex\.min\.css)"/g,(_,attr,file)=>`${attr}="${file}?v=${version}"`);
 await fs.writeFile(file,html);
}
await fs.writeFile(path.join(out,'version.json'),JSON.stringify({version,built:new Date().toISOString(),lessons:lessons.length,models:models.length,subparts:data.exams.reduce((n,e)=>n+e.items.length,0)}));
const assets=(await collect(out)).map(f=>'./'+path.relative(out,f));
await fs.writeFile(path.join(out,'sw.js'),`const CACHE='theory-${version}';const ASSETS=${JSON.stringify(assets)};
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('theory-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));return;}event.respondWith(caches.match(event.request,{ignoreSearch:new URL(event.request.url).searchParams.get('v')==='${version}'}).then(r=>r||fetch(event.request)));});`);
await fs.writeFile(path.join(out,'.nojekyll'),'');
console.log(`Built ${lessons.length} lessons, ${data.exams.reduce((n,e)=>n+e.items.length,0)} exam subparts, version ${version}`);
