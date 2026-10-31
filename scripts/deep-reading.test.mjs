import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {JSDOM} from 'jsdom';
const data=JSON.parse(await fs.readFile(new URL('../dist/content.json',import.meta.url),'utf8'));
const models=new Map(data.models.map(m=>[m.id,m]));
test('source-page maps cover all 493 pages and render the correct PDF destinations',()=>{
 let count=0;
 for(const m of data.models){
  const c=m.coverage,covered=new Set();
  assert.equal(c.sha256,m.sha256);assert.equal(c.file,m.file);
  const dom=new JSDOM(m.html).window.document;
  const links=[...dom.querySelectorAll('.coverage-map li a')];
  assert.equal(links.length,c.sections.length);
  c.sections.forEach((s,i)=>{
   assert.ok(1<=s.from&&s.from<=s.to&&s.to<=c.pageCount,m.id);
   assert.equal(links[i].href,m.url.replace(/#page=\d+$/,'')+'#page='+s.from);
   assert.ok(s.concepts.length>15);
   for(let p=s.from;p<=s.to;p++)covered.add(p);
  });
  assert.equal(covered.size,c.pageCount,m.id);count+=c.pageCount;
  assert.ok([...dom.querySelectorAll('h2')].filter(h=>/^Round \d/.test(h.textContent)).length>=2,m.id);
 }
 assert.equal(count,493);
});
test('published eight-subset NFA table agrees with direct moves and epsilon closure',()=>{
 // Independent specification from NFA2 p4: notably q2 has BOTH a and b moves to q3.
 const moves={1:{a:[],b:[2]},2:{a:[2,3],b:[3]},3:{a:[1],b:[]}};
 const closure=s=>[...new Set([...s,...(s.includes(1)?[3]:[])])].sort();
 const next=(s,a)=>closure(s.flatMap(q=>moves[q][a]));
 const parse=s=>s==='∅'?[]:s.replace(/[{}]/g,'').split(',').map(Number);
 const key=s=>s.join(',');
 const dom=new JSDOM(models.get('chap1_NFA3').html).window.document;
 const table=[...dom.querySelectorAll('table')].find(t=>t.textContent.includes('DFA summary'));
 assert.ok(table);
 const rows=[...table.querySelectorAll('tbody tr')];assert.equal(rows.length,8);
 const seen=new Set();
 for(const row of rows){const cells=[...row.querySelectorAll('td')].map(c=>c.textContent.trim());const s=parse(cells[0]);seen.add(key(s));assert.deepEqual(parse(cells[1]),next(s,'a'));assert.deepEqual(parse(cells[2]),next(s,'b'));}
 assert.equal(seen.size,8);
 let s=closure([1]);for(const a of 'baa')s=next(s,a);assert.deepEqual(s,[1,2,3]);
 s=closure([1]);for(const a of 'bb')s=next(s,a);assert.deepEqual(s,[3]);
 assert.deepEqual(next(s,'b'),[]);
 const reach=new Set([key(closure([1]))]),queue=[closure([1])];
 for(let i=0;i<queue.length;i++)for(const a of ['a','b']){const n=next(queue[i],a);if(!reach.has(key(n))){reach.add(key(n));queue.push(n);}}
 assert.deepEqual([...reach].sort(),['','1,2,3','1,3','2','2,3','3'].sort());
});
test('the published CNF preconversion derivation uses one legal source rule per step',async()=>{
 const text=await fs.readFile(new URL('../content/models/chap2_CNF1.md',import.meta.url),'utf8');
 const chain=text.match(/complete old derivation: ([^\.]+)\./)?.[1];assert.ok(chain);
 const steps=chain.split('⇒'),rules={S:['ASA','aB'],A:['B','S'],B:['b','']};
 assert.equal(steps[0],'S');assert.equal(steps.at(-1),'ab');
 for(let i=1;i<steps.length;i++){
  const before=steps[i-1],after=steps[i];let legal=false;
  for(let j=0;j<before.length;j++)for(const rhs of rules[before[j]]??[])if(before.slice(0,j)+rhs+before.slice(j+1)===after)legal=true;
  assert.ok(legal,`${before} ⇒ ${after}`);
 }
});
