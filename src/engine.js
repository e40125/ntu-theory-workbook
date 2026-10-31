// Models used by the visible worked examples. Stack top is the leftmost symbol.
export function maskTransition(state, symbol) {
  const R=(next,write=symbol)=>({next,write,move:1});
  const L=(next,write=symbol)=>({next,write,move:-1});
  if(state==='q0') return symbol==='a'?R('q1','⊔'):symbol==='b'?R('q2','⊔'):symbol==='#'?R('qa'):R('qr');
  if(['q1','q2'].includes(state)) return 'ab'.includes(symbol)&&symbol.length===1?R(state):symbol==='#'?R(state==='q1'?'q3':'q4'):R('qr');
  if(['q3','q4'].includes(state)) return symbol==='⊔'?R(state):symbol==='0'?L('q8','⊔'):symbol==='1'?R(state==='q3'?'q5':'q6','⊔'):R('qr');
  if(['q5','q6'].includes(state)) return symbol==='⊔'?L('q7',state==='q5'?'a':'b'):'01#ab'.includes(symbol)&&symbol.length===1?R(state):R('qr');
  if(state==='q7') return 'ab'.includes(symbol)&&symbol.length===1?L(state):symbol==='#'?L('q8'):R('qr');
  if(state==='q8') return ['0','1','⊔'].includes(symbol)?L(state):symbol==='#'?L('q9'):R('qr');
  if(state==='q9') return 'ab'.includes(symbol)&&symbol.length===1?L(state):symbol==='⊔'?R('q0'):R('qr');
  return null;
}
export function maskRun(input,limit=10000) {
  if(!/^[ab]*#[01]*#$/.test(input)) throw new Error('Use text#mask#, with text made of a/b and mask made of 0/1.');
  const [word,mask]=input.split('#'); if(word.length!==mask.length) throw new Error('The text and mask must have the same length.');
  if(word.length>24) throw new Error('Use at most 24 text characters for a readable trace.');
  const tape=[...input,'⊔'];let state='q0',head=0;
  const steps=[{state,head,tape:[...tape],action:'Start'}];
  while(!['qa','qr'].includes(state)&&steps.length<=limit){
    const old=tape[head]??'⊔',t=maskTransition(state,old);
    const action=`${state}: read ${old}, write ${t.write}, move ${t.move===1?'right':'left'}, enter ${t.next}`;
    tape[head]=t.write;head=Math.max(0,head+t.move);if(head>=tape.length)tape.push('⊔');state=t.next;
    steps.push({state,head,tape:[...tape],action});
  }
  return {steps,status:state==='qa'?'accept':state==='qr'?'reject':'limit',output:tape.join('').split('#')[2].replaceAll('⊔','')};
}
export function palindromeBranches(input){
  if(!/^[01]*$/.test(input)||input.length>16)throw new Error('Use up to 16 binary symbols; leave blank for ε.');
  const branches=[];
  for(let k=0;k<=input.length;k++){
    let stack=input.slice(0,k).split('').reverse().join('')+'$',unread=input.slice(k),i=0;
    const steps=[{state:'r',stack,unread,action:`Switch after pushing ${k} symbols`}];
    while(i<unread.length&&stack[0]===unread[i]){stack=stack.slice(1);i++;steps.push({state:'r',stack,unread:unread.slice(i),action:'Match and pop'});}
    const accept=i===unread.length&&stack==='$';
    if(stack==='$')steps.push({state:'f',stack:'ε',unread:unread.slice(i),action:accept?'Pop $, accept':'Pop $, but unread input remains: not accepted'});
    branches.push({k,accept,steps});
  }
  return {branches,accept:branches.some(b=>b.accept)};
}
export function recurrence(exams,topics){return exams.filter(e=>e.items.some(q=>topics.includes(q.topic))).map(e=>e.year);}
