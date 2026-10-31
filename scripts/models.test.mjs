import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {JSDOM} from 'jsdom';
const data=JSON.parse(await fs.readFile(new URL('../dist/content.json',import.meta.url),'utf8'));
test('every published deck has a substantial distinct source-linked mental model',()=>{
 assert.equal(data.models.length,49);
 assert.deepEqual(data.models.map(m=>m.file),data.slides.map(s=>s.name));
 const titles=new Set(),texts=new Set();
 for(const m of data.models){
  const source=data.slides.find(s=>s.name===m.file);
  assert.equal(m.sha256,source.sha256);assert.equal(m.pages,`1–${source.pages}`);assert.equal(m.url,source.url+'#page=1');
  assert.ok(m.words>=380,`${m.id}: ${m.words}`);
  assert.ok(!m.html.includes('katex-error')&&!m.html.includes('MATHPLACEHOLDER'),m.id);
  assert.ok(!/\\\(|\\\[/.test(m.html),m.id);
  const dom=new JSDOM(m.html);assert.ok(dom.window.document.querySelectorAll('h2').length>=4,m.id);
  assert.equal(dom.window.document.querySelectorAll('h1').length,0,m.id);
  assert.match(dom.window.document.body.textContent,/connected check/i,m.id);
  titles.add(m.title);texts.add(m.html);
 }
 assert.equal(titles.size,49);assert.equal(texts.size,49);
});
test('mental models lead every old lesson while practice and identifiers remain available',()=>{
 for(const l of data.lessons){const d=new JSDOM(l.html).window.document;
  assert.ok(d.querySelector('.model-first'),l.id);assert.ok(d.querySelector('.worked-lesson details.solution'),l.id);
  assert.ok(l.modelIds.every(id=>data.models.some(m=>m.id===id)),l.id);
  assert.ok(l.html.indexOf('model-first')<l.html.indexOf('worked-lesson'),l.id);
 }
 const cnf=data.lessons.find(l=>l.id==='09-cnf-worked');
 assert.match(cnf.html,/unfinished jobs/);assert.match(cnf.html,/position 1/);assert.match(cnf.html,/pure handoffs/);
});
test('both complete reading editions have unique anchors and valid local fragment links',async()=>{
 for(const file of ['book.html','mental-models.html']){
  const d=new JSDOM(await fs.readFile(new URL('../dist/'+file,import.meta.url),'utf8')).window.document;
  const ids=[...d.querySelectorAll('[id]')].map(e=>e.id);assert.equal(ids.length,new Set(ids).size,file);
  for(const a of d.querySelectorAll('a[href^="#"]'))assert.ok(d.getElementById(a.hash.slice(1)),`${file} ${a.hash}`);
  if(file==='mental-models.html')for(const m of data.models)assert.ok(d.getElementById(m.id),m.id);
 }
});
