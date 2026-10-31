export const KEY='theory-workbook-v1';
export const emptyState=()=>({version:1,visits:{},attempts:[],drafts:{},exposures:{},lastLesson:null,theme:'light',largeText:false});
export function validState(x,ids){
 if(!x||x.version!==1||!Array.isArray(x.attempts)||x.attempts.length>10000) return false;
 if(!x.visits||typeof x.visits!=='object'||!x.drafts||typeof x.drafts!=='object'||!x.exposures||typeof x.exposures!=='object')return false;
 if(!x.attempts.every(a=>ids.includes(a.id)&&['repair','assisted','independent','retained'].includes(a.status)&&Number.isFinite(a.at)&&typeof a.note==='string'&&a.note.length<=20000))return false;
 if(Object.values(x.visits).some(v=>!Number.isFinite(v))||Object.values(x.exposures).some(v=>!Number.isFinite(v)))return false;
 if(Object.keys(x.drafts).some(k=>!ids.includes(k)))return false;
 if(Object.values(x.drafts).some(v=>typeof v!=='string'||v.length>20000))return false;
 return !x.lastLesson||ids.includes(x.lastLesson);
}
export function reviewDelay(status){return ({repair:1,assisted:1,independent:3,retained:7})[status]*86400000;}
export function dueAttempts(state,now=Date.now()){
 const latest=new Map();for(const a of state.attempts) latest.set(a.id,a);
 return [...latest.values()].filter(a=>a.at+reviewDelay(a.status)<=now).sort((a,b)=>a.at-b.at);
}
export function canRecordRetained(state,id,now=Date.now()){
 return state.attempts.some(a=>a.id===id&&['independent','retained'].includes(a.status)&&now-a.at>=86400000);
}
export function label(status){return ({repair:'Needs work',assisted:'With help',independent:'Unaided attempt',retained:'Later recall'})[status]||'No attempt recorded';}

export function daysToExam(now=new Date()){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);const get=t=>Number(parts.find(p=>p.type===t).value);return Math.round((Date.UTC(2026,10,16)-Date.UTC(get('year'),get('month')-1,get('day')))/86400000);}
