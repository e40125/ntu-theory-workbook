import test from 'node:test';import assert from 'node:assert/strict';
// Least fixed point of terminal strings up to a bound. Not a proof of equivalence.
function language(grammar,start,bound=6){const sets=Object.fromEntries(Object.keys(grammar).map(v=>[v,new Set()]));let change=true;while(change){change=false;for(const [v,rules]of Object.entries(grammar))for(const rule of rules){let products=[''];for(const c of rule){const opts=sets[c]?[...sets[c]]:[c];products=products.flatMap(a=>opts.map(b=>a+b)).filter(s=>s.length<=bound);if(!products.length)break;}for(const s of products)if(!sets[v].has(s)){sets[v].add(s);change=true;}}}return [...sets[start]].sort();}
function cnfShape(g,start){for(const [a,rs]of Object.entries(g))for(const r of rs){assert.ok(r.length===0&&a===start||r.length===1&&!g[r]||r.length===2&&g[r[0]]&&g[r[1]],`${a} → ${r}`);assert.ok(!r.includes(start),`${start} on right`);}}
test('complete CNF examples preserve short terminal languages and all final shapes',()=>{const examples=[
 [{S:['aSb','']},{Z:['UX','UV',''],S:['UX','UV'],X:['SV'],U:['a'],V:['b']}],
 [{S:['AB'],A:['aA',''],B:['b']},{Z:['AB','b'],S:['AB','b'],A:['UA','a'],B:['b'],U:['a']}],
 [{S:['A','0A'],A:['SAS','']},{Z:['UA','0','SB','SS','AS','SA',''],S:['UA','0','SB','SS','AS','SA'],A:['UA','0','SB','SS','AS','SA'],B:['AS'],U:['0']}],
 [{S:['CS',''],C:['SCS','CS','1']},{Z:['CS','SB','1','SC',''],S:['CS','SB','1','SC'],C:['SB','CS','1','SC'],B:['CS']}],
 [{S:['AB','A'],A:['aA','a'],B:['bB','']},{Z:['AB','UA','a'],S:['AB','UA','a'],A:['UA','a'],B:['WB','b'],U:['a'],W:['b']}]
 ];for(const [before,after]of examples){cnfShape(after,'Z');assert.deepEqual(language(before,'S'),language(after,'Z'));}});
test('weighted-count constructive proofs satisfy counts and totals including zero',()=>{for(let n=0;n<=50;n++)for(let m=0;m<=80;m++){const t=2*m;if(n<=t&&t<=3*n){const counts=t<=2*n?[2*n-t,t-n,0]:[0,3*n-t,t-2*n];assert.ok(counts.every(k=>k>=0));assert.equal(counts.reduce((a,b)=>a+b,0),n);assert.equal(counts.reduce((a,b,i)=>a+b*(i+1),0),t);}if(n<=3*m&&3*m<=2*n){const twos=3*m-n,ones=2*n-3*m;assert.equal(twos+ones,n);assert.equal(2*twos+ones,3*m);}}});
