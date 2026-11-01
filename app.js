(function(){
const KEY='disc-teste-v2';
const VERSION='2.1.0';
const NATIVE=!(window.claude&&window.claude.use);
const PERMS=[[0,1,2,3],[2,0,3,1],[1,3,0,2],[3,2,1,0],[1,0,3,2],[2,3,1,0],[3,0,2,1],[0,2,3,1],[2,1,0,3],[1,2,3,0]];
const NA=GA.length,NB=GB.length,NC=GC.length,PER=7;
const CPAGES=[];for(let i=0;i<NC;i+=PER)CPAGES.push([...Array(Math.min(PER,NC-i)).keys()].map(k=>i+k));
const STEPS=[{t:'P',p:1}];
for(let i=0;i<NA;i++)STEPS.push({t:'A',i});
STEPS.push({t:'P',p:2});
for(let i=0;i<NB;i++)STEPS.push({t:'B',i});
STEPS.push({t:'P',p:3});
CPAGES.forEach((items,i)=>STEPS.push({t:'C',i,items}));
const QSTEPS=STEPS.filter(s=>s.t!=='P').length;

const PARTS={
 1:{t:'Como você é',x:'Pense em como você age quando está à vontade, sem cobrança externa e sem estar tentando agradar ninguém. É o seu jeito natural.',
    h:'<h3>Como responder</h3><ul class="list"><li>Em cada grupo aparecem 4 palavras.</li><li>Toque nelas em ordem: primeiro a que <b>mais</b> tem a ver com você, depois a segunda, depois a terceira. A última entra sozinha.</li><li>Para corrigir, toque de novo numa palavra já marcada.</li><li>Todas as palavras são qualidades. A ordem é o que importa.</li></ul>'},
 2:{t:'O que o seu trabalho pede',x:'Agora pense no seu trabalho atual, ou na sua rotina principal se não estiver trabalhando. Não é como você é, e sim como você sente que precisa agir lá.',
    h:'<h3>Como responder</h3><ul class="list"><li>Em cada grupo, marque em <b>Mais</b> o comportamento que o ambiente mais exige de você.</li><li>Marque em <b>Menos</b> o que ele menos exige.</li><li>Se a resposta for igual ao seu jeito natural, tudo bem. O teste compara os dois.</li></ul>'},
 3:{t:'Situações do dia a dia',x:'Leia cada frase e diga o quanto ela descreve você. Este bloco confere a coerência das respostas anteriores.',
    h:'<h3>Como responder</h3><ul class="list"><li>Use a escala de 1 a 5: 1 é discordo totalmente, 5 é concordo totalmente.</li><li>Use o 3 só quando estiver realmente em dúvida.</li><li>Algumas frases são de controle e pedem uma resposta específica. Leia com atenção.</li></ul>'}
};

const blank=()=>({id:null,email:'',nome:'',step:0,t0:null,t1:null,A:Array.from({length:NA},()=>[]),B:Array.from({length:NB},()=>({m:null,l:null})),C:Array(NC).fill(null),done:false});
let st=blank();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
const load=()=>{try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s&&s.A&&s.A.length===NA&&s.C&&s.C.length===NC)return s}catch(e){}return null};
const clearSave=()=>{try{localStorage.removeItem(KEY)}catch(e){}};
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const show=id=>{['intro','part','quiz','result'].forEach(s=>$(s).hidden=(s!==id));window.scrollTo(0,0)};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

const saved=load();
try{$('ver').textContent='v'+VERSION}catch(e){}
if(saved&&saved.id&&(saved.step>0||saved.done)){$('resume').hidden=false;if(saved.nome)$('nome').value=saved.nome;if(saved.email)$('email').value=saved.email;$('resume').textContent=saved.done?'Ver meu resultado':'Continuar de onde parei'}
const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function startState(){
 const n=$('nome').value.trim(),e=$('email').value.trim(),c=$('consent').checked;
 let h='';
 if(n.length<2)h='Digite seu nome.';else if(!EMAIL_RE.test(e))h='Digite um e-mail válido.';else if(!c)h='Marque a autorização de uso dos dados para continuar.';
 return {ok:!h,h,n,e};
}
function refreshStart(){const r=startState();$('start').disabled=!r.ok;$('start-hint').textContent=($('nome').value||$('email').value)?r.h:''}
['nome','email','consent'].forEach(id=>{$(id).addEventListener('input',refreshStart);$(id).addEventListener('change',refreshStart)});
const newId=()=>(window.crypto&&crypto.randomUUID)?crypto.randomUUID():('id-'+Date.now().toString(36)+Math.random().toString(36).slice(2,10));
function sendLead(stage,extra){
 if(!NATIVE||!st.id)return;
 try{fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},keepalive:true,
  body:JSON.stringify(Object.assign({id:st.id,nome:st.nome,email:st.email,stage,version:VERSION},extra||{}))}).catch(()=>{})}catch(e){}
}
$('start').onclick=()=>{const r=startState();if(!r.ok){$('start-hint').textContent=r.h;return}
 st=blank();st.id=newId();st.nome=r.n;st.email=r.e;st.t0=Date.now();save();sendLead('start',{consent:true});go()};
$('resume').onclick=()=>{st=saved;const n=$('nome').value.trim();if(n)st.nome=n;if(st.done){renderResult();show('result')}else go()};

function go(){const s=STEPS[st.step];if(s.t==='P')renderPart(s.p);else{renderQ();show('quiz')}}
function renderPart(p){const P=PARTS[p];$('p-eye').textContent='Bloco '+p+' de 3';$('p-title').textContent=P.t;$('p-text').textContent=P.x;$('p-how').innerHTML=P.h;show('part')}
$('p-go').onclick=()=>{st.step++;save();go()};

function answered(s){
 if(s.t==='A')return st.A[s.i].length===4;
 if(s.t==='B'){const a=st.B[s.i];return !!(a.m&&a.l)}
 if(s.t==='C')return s.items.every(k=>st.C[k]!=null);
 return true;
}
function renderQ(){
 const s=STEPS[st.step];
 const qi=STEPS.slice(0,st.step).filter(x=>x.t!=='P').length;
 const pct=Math.round(qi/QSTEPS*100);
 $('qpct').textContent=pct+'% concluído';$('qbar').style.width=pct+'%';
 const card=$('qcard');card.innerHTML='';
 if(s.t==='A'){
  $('qcount').textContent='Bloco 1 · Grupo '+(s.i+1)+' de '+NA;
  $('qask').textContent='Toque nas palavras em ordem, da que mais tem a ver com você para a que menos tem.';
  const g=GA[s.i],ord=st.A[s.i];
  PERMS[s.i%PERMS.length].forEach(k=>{
   const f=F[k],r=ord.indexOf(f);
   const b=document.createElement('button');b.className='rank'+(r>=0?' on':'');b.type='button';
   b.innerHTML='<span class="badge">'+(r>=0?r+1:'')+'</span><span class="qword">'+esc(g[f])+'</span><span class="lab">'+(r===0?'mais parecido':r===3?'menos parecido':'')+'</span>';
   b.setAttribute('aria-label',g[f]+(r>=0?', posição '+(r+1):', sem posição'));
   b.onclick=()=>{
    if(r>=0)ord.splice(r);else{ord.push(f);if(ord.length===3){const rest=F.find(x=>!ord.includes(x));ord.push(rest)}}
    save();renderQ();
   };
   card.appendChild(b);
  });
 }else if(s.t==='B'){
  $('qcount').textContent='Bloco 2 · Grupo '+(s.i+1)+' de '+NB;
  $('qask').textContent='No meu trabalho atual, o ambiente pede que eu seja...';
  const g=GB[s.i],a=st.B[s.i];
  card.innerHTML='<div class="qcols"><span>Comportamento</span><span>Mais</span><span>Menos</span></div>';
  PERMS[(s.i+3)%PERMS.length].forEach(k=>{
   const f=F[k];const row=document.createElement('div');row.className='qrow';
   row.innerHTML='<div class="qword">'+esc(g[f])+'</div>';
   const bm=document.createElement('button');bm.className='pick most'+(a.m===f?' on':'');bm.textContent='Mais';bm.setAttribute('aria-pressed',a.m===f);bm.setAttribute('aria-label','Mais: '+g[f]);
   const bl=document.createElement('button');bl.className='pick least'+(a.l===f?' on':'');bl.textContent='Menos';bl.setAttribute('aria-pressed',a.l===f);bl.setAttribute('aria-label','Menos: '+g[f]);
   bm.onclick=()=>{a.m=f;if(a.l===f)a.l=null;save();renderQ()};
   bl.onclick=()=>{a.l=f;if(a.m===f)a.m=null;save();renderQ()};
   row.append(bm,bl);card.appendChild(row);
  });
 }else{
  $('qcount').textContent='Bloco 3 · Página '+(s.i+1)+' de '+CPAGES.length;
  $('qask').textContent='O quanto cada frase descreve você? 1 discordo totalmente, 5 concordo totalmente.';
  s.items.forEach(k=>{
   const it=GC[k],v=st.C[k];
   const box=document.createElement('div');box.className='lk';
   box.innerHTML='<p>'+esc(it.t)+'</p>';
   const opts=document.createElement('div');opts.className='lkopts';opts.setAttribute('role','radiogroup');
   for(let n=1;n<=5;n++){const b=document.createElement('button');b.type='button';b.textContent=n;b.className=v===n?'on':'';b.setAttribute('role','radio');b.setAttribute('aria-checked',v===n);b.setAttribute('aria-label',n+', '+LK[n-1]);
    b.onclick=()=>{st.C[k]=n;save();renderQ()};opts.appendChild(b)}
   const leg=document.createElement('div');leg.className='lkleg';leg.innerHTML='<span>Discordo totalmente</span><span>Concordo totalmente</span>';
   const sel=document.createElement('div');sel.className='lksel';sel.textContent=v?LK[v-1]:'';
   box.append(opts,leg,sel);card.appendChild(box);
  });
 }
 const ok=answered(s);
 $('next').disabled=!ok;
 $('next').textContent=(st.step===STEPS.length-1)?'Ver meu resultado':'Próximo';
 $('back').disabled=st.step===0;
 let h='';
 if(!ok){if(s.t==='A')h='Faltam '+(3-Math.min(3,st.A[s.i].length))+' toque(s) para completar a ordem.';else if(s.t==='B')h='Marque uma opção em Mais e outra em Menos.';else h='Responda todas as frases desta página.'}
 $('hint').textContent=h;
}
$('next').onclick=()=>{
 const s=STEPS[st.step];if(!answered(s))return;
 if(st.step<STEPS.length-1){st.step++;save();go()}
 else{st.done=true;st.t1=Date.now();save();renderResult();show('result');
  sendLead('done',{result:{talento:REP.top.n,similaridade:REP.top.sim,natural:REP.codeE,atual:REP.codeR,estrutural:R.estr,adaptado:R.adap,confiabilidade:R.score,minutos:R.mins?Math.round(R.mins):null}})}
};
$('back').onclick=()=>{if(st.step>0){st.step--;if(STEPS[st.step].t==='P'&&st.step>0)st.step--;save();go()}};

/* ---------- pontuação ---------- */
function band(v){return BANDS.find(b=>v>=b.min)}
function subLevel(v){return v>=76?'Muito alto':v>=60?'Alto':v>=41?'Médio':v>=25?'Baixo':'Muito baixo'}
function subKey(v){return v>=60?'a':v<=40?'b':'m'}
function compute(){
 const sA={D:0,I:0,S:0,C:0};
 st.A.forEach(o=>o.forEach((f,r)=>sA[f]+=3-r));
 const ips={};F.forEach(f=>ips[f]=sA[f]/(3*NA)*100);
 const lsum={D:0,I:0,S:0,C:0},lcnt={D:0,I:0,S:0,C:0},fw={D:[],I:[],S:[],C:[]},rv={D:[],I:[],S:[],C:[]};
 let attOk=0,attN=0;const vals=[];
 GC.forEach((it,k)=>{const v=st.C[k];if(v==null)return;
  if(it.att){attN++;if(v===it.att)attOk++;return}
  vals.push(v);const sc=it.r?6-v:v;lsum[it.f]+=sc;lcnt[it.f]++;(it.r?rv:fw)[it.f].push(sc)});
 const lik={};F.forEach(f=>lik[f]=lcnt[f]?((lsum[f]/lcnt[f])-1)/4*100:50);
 const lm=F.reduce((a,f)=>a+lik[f],0)/4;
 const estr={};F.forEach(f=>{const likC=50+(lik[f]-lm);const bl=0.6*ips[f]+0.4*likC;estr[f]=Math.round(clamp(50+(bl-50)*1.1,3,97))});
 const M={D:0,I:0,S:0,C:0},L={D:0,I:0,S:0,C:0};
 st.B.forEach(a=>{if(a.m)M[a.m]++;if(a.l)L[a.l]++});
 const adap={},res={},chg={};
 F.forEach(f=>{adap[f]=Math.round(clamp(50+(M[f]-L[f])*4.2,3,97));res[f]=Math.round((estr[f]+adap[f])/2);chg[f]=adap[f]-estr[f]});
 const subs=SUB.map(s=>({...s,v:Math.round(clamp(50+(estr[s.x]-estr[s.y])/2,0,100))}));
 const tal=TAL.map(t=>{const rms=Math.sqrt(F.reduce((a,f,k)=>a+Math.pow(estr[f]-t.v[k],2),0)/4);return {...t,sim:Math.round(clamp(100-1.3*rms,0,100))}}).sort((a,b)=>b.sim-a.sim);

 // confiabilidade
 const rank=o=>{const arr=F.slice().sort((a,b)=>o[b]-o[a]);const r={};arr.forEach((f,i)=>r[f]=i);return r};
 const ra=rank(ips),rl=rank(lik);const d2=F.reduce((a,f)=>a+Math.pow(ra[f]-rl[f],2),0);const rho=1-6*d2/60;
 const contra=F.filter(f=>fw[f].length&&rv[f].length&&Math.abs(fw[f].reduce((a,b)=>a+b,0)/fw[f].length-rv[f].reduce((a,b)=>a+b,0)/rv[f].length)>=1.75);
 const freq={};vals.forEach(v=>freq[v]=(freq[v]||0)+1);const maxF=Math.max(0,...Object.values(freq))/Math.max(1,vals.length);
 const mins=(st.t0&&st.t1)?(st.t1-st.t0)/60000:null;
 let score=100;const notes=[];
 if(attOk<attN){score-=25*(attN-attOk);notes.push((attN-attOk)+' de '+attN+' frases de controle foram respondidas de forma diferente do pedido.')}
 if(rho<0){score-=25;notes.push('A ordem dos fatores no Bloco 1 ficou bem diferente da ordem no Bloco 3.')}
 else if(rho<0.4){score-=10;notes.push('A ordem dos fatores no Bloco 1 e no Bloco 3 coincide só em parte.')}
 if(contra.length){score-=8*contra.length;notes.push('Respostas contraditórias entre frases diretas e invertidas em: '+contra.map(f=>INFO[f].nome).join(', ')+'.')}
 if(maxF>0.7){score-=20;notes.push('Muitas frases do Bloco 3 receberam a mesma nota.')}
 if(mins!==null&&mins<7){score-=15;notes.push('O teste foi concluído em menos de 7 minutos, o que costuma indicar respostas apressadas.')}
 score=clamp(score,0,100);
 const nivel=score>=80?'Alta':score>=60?'Moderada':'Baixa';
 if(!notes.length)notes.push('Respostas coerentes entre os três blocos, frases de controle corretas e tempo de resposta adequado.');
 const order=o=>F.slice().sort((a,b)=>o[b]-o[a]);
 const codeOf=o=>{const s=order(o);return (o[s[1]]>=52&&o[s[0]]-o[s[1]]<=22)?s[0]+s[1]:s[0]};
 const adapIdx=F.reduce((a,f)=>a+Math.abs(chg[f]),0);
 return {ips,lik,estr,adap,res,chg,subs,tal,rho,contra,score,nivel,notes,mins,M,L,order,codeOf,adapIdx,attOk,attN};
}

/* ---------- gráficos ---------- */
function mini(o){
 return '<div class="ch"><div class="mid"></div>'+F.map(f=>'<div class="col"><span>'+o[f]+'%</span><i style="height:calc((100% - 22px) * '+(o[f]/100)+');background:'+INFO[f].cor+'"></i></div>').join('')+'</div><div class="ax">'+F.map(f=>'<span style="color:'+INFO[f].cor+'">'+f+'</span>').join('')+'</div>';
}
function miniDiv(o){
 return '<div class="dv"><div class="zero"></div>'+F.map(f=>{const v=o[f],h=Math.min(50,Math.abs(v))/50*44;
  const bar=v>=0?'bottom:50%;height:'+h+'%':'top:50%;height:'+h+'%';
  const lab=v>=0?'bottom:calc(50% + '+h+'% + 2px)':'top:calc(50% + '+h+'% + 2px)';
  return '<div class="col"><i style="'+bar+';background:'+INFO[f].cor+'"></i><span style="'+lab+';font-size:.78rem;font-weight:700">'+(v>0?'+':'')+v+'%</span></div>'}).join('')+'</div><div class="ax">'+F.map(f=>'<span style="color:'+INFO[f].cor+'">'+f+'</span>').join('')+'</div>';
}
const li=a=>a.map(x=>'<li>'+esc(x)+'</li>').join('');
const codeHtml=c=>c.split('').map(f=>'<span style="color:'+INFO[f].cor+'">'+f+'</span>').join('');
function factorsHtml(o){
 return R.order(o).map(f=>{const v=o[f],b=band(v);return '<div class="factor"><div class="tag" style="background:'+INFO[f].cor+'">'+f+'</div><div class="txt"><h3>'+INFO[f].nome+': '+v+'%<span class="lvl">'+b.l+'</span></h3><div class="meter"><i style="width:'+v+'%;background:'+INFO[f].cor+'"></i></div><p class="note">Mostra '+INFO[f].foco+'.</p><p>'+FTXT[f][b.k]+'</p></div></div>'}).join('');
}

let R=null,REP=null;
function profileFor(code){const P=PROF[code[0]];return {P,combo:code.length===2?COMBO[code]:null,Q:code.length===2?PROF[code[1]]:null}}
function buildReport(){
 const first=(st.nome||'').split(' ')[0];
 const who=first||'Você';
 const codeE=R.codeOf(R.estr),codeR=R.codeOf(R.res);
 const pe=profileFor(codeE),pr=profileFor(codeR);
 const top=R.tal[0];
 let fortes=pr.P.fortes.slice(),atencao=pr.P.atencao.slice(),cs=pr.P.comSim.slice(),cn=pr.P.comNao.slice();
 if(pr.Q){fortes=fortes.slice(0,4).concat(pr.Q.fortes.slice(0,2));atencao=atencao.slice(0,3).concat(pr.Q.atencao.slice(0,2));cs=cs.slice(0,4).concat(pr.Q.comSim.slice(0,1));cn=cn.slice(0,3).concat(pr.Q.comNao.slice(0,1))}
 const chgLines=F.filter(f=>Math.abs(R.chg[f])>=10).map(f=>CHG[f][R.chg[f]>0?'up':'dn']+' ('+(R.chg[f]>0?'+':'')+R.chg[f]+'%)');
 const ai=R.adapIdx;
 const adapTxt=ai<25?'Seu ambiente atual pede um comportamento próximo do seu jeito natural. O esforço de adaptação é baixo, o que tende a favorecer energia e bem-estar.':ai<=50?'Você faz um esforço moderado para se ajustar ao ambiente atual. É um nível comum e saudável, desde que haja momentos de recuperação.':'Você está fazendo um esforço de adaptação alto. Sustentar por muito tempo um comportamento distante do natural costuma gerar desgaste. Vale observar sinais de cansaço e conversar sobre o que pode ser ajustado.';
 const pressTxt=PROF[R.order(R.estr)[0]].press;
 REP={who,first,codeE,codeR,pe,pr,top,fortes,atencao,cs,cn,chgLines,adapTxt,pressTxt,
  dt:new Date(st.t1||Date.now()).toLocaleDateString('pt-BR'),
  resumo:who+' '+pr.P.resumo,
  comboR:pr.combo?pr.combo.x:'O segundo fator aparece bem abaixo do principal, o que indica um estilo bem definido: as características de '+INFO[codeR[0]].nome+' aparecem com clareza na maior parte das situações.'};
}

let tabSel='estr';
function renderResult(){
 R=compute();buildReport();const E=REP;
 const relColor=R.nivel==='Alta'?'var(--ok)':R.nivel==='Moderada'?'var(--warn)':'var(--bad)';
 const g=k=>({estr:R.estr,adap:R.adap,res:R.res}[k]);
 const subsByF=F.map(f=>R.subs.filter(s=>s.x===f)).flat();
 const html=`
 <div class="stack">
  <span class="eyebrow">Relatório DISC${st.nome?' · '+esc(st.nome):''} · ${E.dt}</span>
  <h1>${esc(E.top.n)}</h1>
  <p class="lead">Talento principal, com ${E.top.sim}% de semelhança com o seu perfil natural. ${esc(E.top.d)}</p>
  <div class="codes">
   <div><span class="eyebrow">Perfil natural</span><span class="code">${codeHtml(E.codeE)}</span><span class="note">${E.pe.combo?E.pe.combo.t:E.pe.P.titulo}</span></div>
   <div><span class="eyebrow">Perfil atual</span><span class="code">${codeHtml(E.codeR)}</span><span class="note">${E.pr.combo?E.pr.combo.t:E.pr.P.titulo}</span></div>
  </div>
 </div>

 <div class="rel">
  <span class="pill" style="background:${relColor}">Confiabilidade ${R.nivel.toLowerCase()} · ${R.score}/100</span>
  <ul class="list">${li(R.notes)}</ul>
  ${R.nivel==='Baixa'?'<p class="note">Com confiabilidade baixa, leia o relatório com cautela. Refazer o teste com calma costuma trazer um resultado mais fiel.</p>':''}
 </div>

 <div class="sec"><h2>Seus quatro gráficos</h2>
  <div class="g4">
   ${['estr','adap','res'].map(k=>`<div class="panel mini"><h3>Gráfico ${GRAPHS[k].n}</h3>${mini(g(k))}<p class="note">${GRAPHS[k].d}</p></div>`).join('')}
   <div class="panel mini"><h3>Gráfico de Mudança</h3>${miniDiv(R.chg)}<p class="note">${GRAPHS.chg.d}</p></div>
  </div>
 </div>

 <div class="sec"><h2>Pessoa e talento</h2>
  <p>Comparamos o seu gráfico Estrutural com 24 perfis de referência. O talento mais próximo é <b>${esc(E.top.n)}</b>, com ${E.top.sim}% de semelhança. Ele é o que provavelmente exige menos esforço de você e torna o dia a dia mais natural, mas não é o único compatível.</p>
  <div style="overflow-x:auto"><table class="cmp"><thead><tr><th></th>${F.map(f=>'<th style="color:'+INFO[f].cor+'">'+f+'</th>').join('')}</tr></thead><tbody>
   <tr><td>Você (estrutural)</td>${F.map(f=>'<td>'+R.estr[f]+'%</td>').join('')}</tr>
   <tr><td>${esc(E.top.n)}</td>${E.top.v.map(v=>'<td>'+v+'%</td>').join('')}</tr>
  </tbody></table></div>
  <h3>Todos os talentos, do mais ao menos parecido</h3>
  <div class="tal">${R.tal.map((t,i)=>`<div class="${i===0?'me':''}"><span>${esc(t.n)}</span><span class="meter"><i style="width:${t.sim}%;background:var(--ink)"></i></span><em>${t.sim}%</em></div>`).join('')}</div>
 </div>

 <div class="sec"><h2>Análise descritiva</h2>
  <div class="kv"><span class="k">Resumo do seu comportamento · gráfico Resultante</span><p>${esc(E.resumo)}</p><p>${esc(E.comboR)}</p></div>
  <div class="kv"><span class="k">Como você se motiva · gráfico Estrutural</span><p>${E.pe.P.motivacao}</p></div>
  <div class="kv"><span class="k">Como gostaria de ser gerenciado · gráfico Estrutural</span><p>${E.pe.P.gestao}</p></div>
  <div class="kv"><span class="k">Como você se comunica · gráfico Resultante</span><p>${E.pr.P.comunica}</p></div>
  <div class="grid2">
   <div class="kv"><span class="k">Ambiente ideal</span><p>${E.pe.P.amb}</p></div>
   <div class="kv"><span class="k">Maior receio</span><p>${E.pe.P.medo}</p></div>
   <div class="kv"><span class="k">Estilo de decisão</span><p>${E.pr.P.dec}</p></div>
  </div>
 </div>

 <div class="sec"><h2>Análise isolada dos fatores</h2>
  <div class="tabs" role="tablist">${['estr','adap','res'].map(k=>`<button class="tab${k===tabSel?' on':''}" data-k="${k}" role="tab" aria-selected="${k===tabSel}">${GRAPHS[k].n}</button>`).join('')}</div>
  <div id="fx">${factorsHtml(g(tabSel))}</div>
 </div>

 <div class="sec"><h2>Subfatores de comportamento</h2>
  <p class="note">Calculados pela diferença entre pares de fatores no gráfico Estrutural. Cada um tem perguntas para você refletir sobre situações reais da sua vida.</p>
  <div class="subs">${subsByF.map(s=>`<div class="sub"><div class="top"><h3>${s.n}</h3><span class="pct">${s.v}%</span></div><div class="meter"><i style="width:${s.v}%;background:${INFO[s.x].cor}"></i></div><span class="note"><b>${subLevel(s.v)}</b> · ${s.def}</span><p>${s[subKey(s.v)]}</p><details><summary>Perguntas para reflexão</summary><ol>${li(s.q)}</ol></details></div>`).join('')}</div>
 </div>

 <div class="grid2">
  <div class="panel stack"><h3>Pontos fortes</h3><ul class="list">${li(E.fortes)}</ul></div>
  <div class="panel stack"><h3>Pontos de atenção</h3><ul class="list">${li(E.atencao)}</ul></div>
 </div>

 <div class="sec"><h2>Adaptação e pressão</h2>
  <div class="kv"><span class="k">Esforço de adaptação · ${R.adapIdx} pontos</span><p>${E.adapTxt}</p></div>
  ${E.chgLines.length?'<ul class="list">'+li(E.chgLines)+'</ul>':'<p>Nenhum fator muda mais de 10 pontos entre o seu jeito natural e o que o ambiente pede.</p>'}
  <div class="callout" style="background:${INFO[R.order(R.estr)[0]].bg}"><h3>Sob pressão intensa</h3><p>${E.pressTxt}</p><p class="note">Em momentos de estresse, sobra pouca energia para adaptação e o estilo Estrutural tende a aparecer com mais força.</p></div>
 </div>

 <div class="sec"><h2>Como se comunicar com você</h2>
  <div class="grid2">
   <div class="panel stack"><h3>Funciona</h3><ul class="list">${li(E.cs)}</ul></div>
   <div class="panel stack"><h3>Evite</h3><ul class="list">${li(E.cn)}</ul></div>
  </div>
 </div>

 <div class="sec"><h2>Para se desenvolver</h2><ul class="list">${li(E.pr.P.dev)}</ul></div>

 <div class="sec"><h2>Como você se dá com outros perfis</h2>
  ${F.map(f=>`<div class="factor"><div class="tag" style="background:${INFO[f].cor};width:36px;height:36px;font-size:1rem">${f}</div><div class="txt"><p><b>Com perfis de ${INFO[f].nome}</b></p><p>${REL[E.codeR[0]][f]}</p></div></div>`).join('')}
 </div>

 <div class="sec"><h2>Metodologia</h2><dl class="met">${METODO.map(m=>'<dt>'+m[0]+'</dt><dd>'+m[1]+'</dd>').join('')}</dl></div>

 <div class="panel stack">
  <h3>Guardar o resultado</h3>
  <p class="note">Baixe o relatório completo em PDF, ou copie um resumo em texto.</p>
  <div class="actions">
   <button class="btn" id="pdf" ${DL?'':'hidden'}>Baixar PDF</button>
   <button class="btn ghost" id="copy">Copiar resumo</button>
   <button class="btn ghost" id="redo">Refazer o teste</button>
  </div>
  <textarea class="copyfb" id="copyfb" readonly hidden aria-label="Resumo para copiar"></textarea>
 </div>
 <p class="note">Este relatório descreve preferências de comportamento a partir das respostas de hoje. Perfis mudam com contexto, fase de vida e função. Use como ponto de partida para reflexão e conversa, nunca como rótulo.</p>`;
 $('result').innerHTML=html;
 document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{tabSel=t.dataset.k;document.querySelectorAll('.tab').forEach(x=>{const on=x===t;x.classList.toggle('on',on);x.setAttribute('aria-selected',on)});$('fx').innerHTML=factorsHtml(g(tabSel))});
 $('copy').onclick=copySummary;$('redo').onclick=()=>{clearSave();st=blank();$('resume').hidden=true;$('consent').checked=false;refreshStart();show('intro')};
 $('pdf').onclick=doPDF;
}

function summaryText(){
 const E=REP,p=o=>F.map(f=>f+' '+o[f]+'%').join(' | ');
 return ['RESULTADO TESTE DISC',st.nome?'Nome: '+st.nome:'','Data: '+E.dt,'',
  'Talento principal: '+E.top.n+' ('+E.top.sim+'% de semelhança)',
  'Perfil natural: '+E.codeE+' · Perfil atual: '+E.codeR,
  'Confiabilidade: '+R.nivel+' ('+R.score+'/100)','',
  'Estrutural: '+p(R.estr),'Adaptado: '+p(R.adap),'Resultante: '+p(R.res),
  'Mudança: '+F.map(f=>f+' '+(R.chg[f]>0?'+':'')+R.chg[f]+'%').join(' | '),'',
  'Subfatores: '+R.subs.map(s=>s.n+' '+s.v+'%').join('; '),'',
  'Resumo: '+E.resumo].filter((x,i,a)=>!(x===''&&a[i-1]==='')).join('\n');
}
function toast(m){const t=$('toast');t.textContent=m;t.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>t.hidden=true,2400)}
function copySummary(){
 const v=summaryText();$('copyfb').value=v;
 const fb=()=>{const ta=$('copyfb');ta.hidden=false;ta.focus();ta.select();toast('Selecionei o texto. Copie manualmente.')};
 try{navigator.clipboard.writeText(v).then(()=>toast('Resumo copiado'),fb)}catch(e){fb()}
}

let DL=null;
if(NATIVE)DL={save:async({filename,data})=>{const u=URL.createObjectURL(data);const a=document.createElement('a');a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);return {status:'saved'}}};
else (async()=>{try{DL=await window.claude.use('downloads')}catch(e){DL=null}const b=$('pdf');if(b)b.hidden=!DL})();

/* ---------- PDF ---------- */
const HEX={D:[181,64,46],I:[194,133,15],S:[59,132,87],C:[46,92,154]};
function buildPDF(){
 const E=REP;
 const doc=new window.jspdf.jsPDF({unit:'mm',format:'a4'});
 const W=210,H=297,M=16,CW=W-2*M,ink=[21,24,30],mut=[91,98,112],line=[221,224,230],soft=[236,238,242];
 let y=M;
 const col=c=>doc.setTextColor(c[0],c[1],c[2]);
 const fill=c=>doc.setFillColor(c[0],c[1],c[2]);
 const draw=c=>doc.setDrawColor(c[0],c[1],c[2]);
 const need=h=>{if(y+h>H-M-8){doc.addPage();y=M}};
 const gap=h=>{y+=h};
 function txt(s,size,o){o=o||{};doc.setFont('helvetica',o.bold?'bold':(o.italic?'italic':'normal'));doc.setFontSize(size);col(o.color||ink);
  const lh=size*0.43,lines=doc.splitTextToSize(String(s),o.w||CW);lines.forEach(l=>{need(lh);doc.text(l,o.x||M,y+lh*0.78);y+=lh})}
 function h1(s){doc.addPage();y=M;txt(s,17,{bold:true});gap(2);draw(line);doc.setLineWidth(0.3);doc.line(M,y,W-M,y);gap(5)}
 function h2(s){gap(5);need(16);txt(s,13,{bold:true});gap(1.2);draw(line);doc.setLineWidth(0.3);doc.line(M,y,W-M,y);gap(3.5)}
 function label(s){gap(2.5);need(10);txt(s.toUpperCase(),7.8,{bold:true,color:mut});gap(1)}
 function bullets(arr,size){size=size||10;arr.forEach(b=>{doc.setFont('helvetica','normal');doc.setFontSize(size);const lh=size*0.43,lines=doc.splitTextToSize(b,CW-5);
  need(lh*lines.length);col(mut);doc.text('•',M+0.6,y+lh*0.78);col(ink);lines.forEach(l=>{doc.text(l,M+5,y+lh*0.78);y+=lh});y+=1.2})}
 function bar(x,yy,w,v,c){fill(soft);doc.roundedRect(x,yy,w,1.8,0.9,0.9,'F');fill(c);doc.roundedRect(x,yy,Math.max(1.8,w*v/100),1.8,0.9,0.9,'F')}
 function chart(x,yy,w,h,title,o,div){
  doc.setFont('helvetica','bold');doc.setFontSize(9.5);col(ink);doc.text(title,x,yy+3.5);
  const top=yy+9,ch=h-17,base=top+ch,bw=(w-15)/4,gx=5;
  draw(line);doc.setLineWidth(0.25);
  if(div){const z=top+ch/2;doc.line(x,z,x+w,z);
   F.forEach((f,k)=>{const v=o[f],bx=x+k*(bw+gx),hh=Math.min(50,Math.abs(v))/50*(ch/2-3);fill(HEX[f]);
    if(v>=0)doc.rect(bx,z-hh,bw,hh,'F');else doc.rect(bx,z,bw,hh,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(7.5);col(ink);doc.text((v>0?'+':'')+v+'%',bx+bw/2,v>=0?z-hh-1.2:z+hh+3,{align:'center'})});
  }else{doc.line(x,base,x+w,base);doc.setLineDashPattern([1,1],0);doc.line(x,base-ch/2,x+w,base-ch/2);doc.setLineDashPattern([],0);
   F.forEach((f,k)=>{const v=o[f],bx=x+k*(bw+gx),hh=Math.max(0.6,(ch-5)*v/100);fill(HEX[f]);doc.roundedRect(bx,base-hh,bw,hh,1,1,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(7.5);col(ink);doc.text(v+'%',bx+bw/2,base-hh-1.2,{align:'center'})});}
  F.forEach((f,k)=>{const bx=x+k*(bw+gx);doc.setFont('helvetica','bold');doc.setFontSize(9);col(HEX[f]);doc.text(f,bx+bw/2,yy+h-2.5,{align:'center'})});
 }

 // capa
 F.forEach((f,k)=>{fill(HEX[f]);doc.roundedRect(M+k*8,y,6.5,6.5,1.2,1.2,'F');doc.setTextColor(255,255,255);doc.setFont('helvetica','bold');doc.setFontSize(9);doc.text(f,M+k*8+3.25,y+4.6,{align:'center'})});
 doc.setFont('helvetica','normal');doc.setFontSize(9);col(mut);doc.text('Relatório DISC  ·  '+E.dt,W-M,y+4.6,{align:'right'});
 y+=13;
 if(st.nome){txt(st.nome,12,{color:mut});gap(1)}
 txt('Talento principal',8,{bold:true,color:mut});gap(0.5);
 txt(E.top.n,24,{bold:true});gap(1);
 txt(E.top.sim+'% de semelhança com o seu perfil natural. '+E.top.d,10,{color:mut});gap(4);
 const cy=y;
 [['PERFIL NATURAL',E.codeE,E.pe],['PERFIL ATUAL',E.codeR,E.pr]].forEach((c,i)=>{const x=M+i*60;doc.setFont('helvetica','bold');doc.setFontSize(7.5);col(mut);doc.text(c[0],x,cy+3);
  let cx=x;doc.setFontSize(22);c[1].split('').forEach(f=>{col(HEX[f]);doc.text(f,cx,cy+12);cx+=doc.getTextWidth(f)+0.8});
  doc.setFont('helvetica','normal');doc.setFontSize(8.5);col(mut);doc.text(c[2].combo?c[2].combo.t:c[2].P.titulo,x,cy+17)});
 y=cy+24;
 const cw2=(CW-8)/2,chH=52;need(chH*2+10);
 chart(M,y,cw2,chH,'Estrutural',R.estr);chart(M+cw2+8,y,cw2,chH,'Adaptado',R.adap);y+=chH+5;
 chart(M,y,cw2,chH,'Resultante',R.res);chart(M+cw2+8,y,cw2,chH,'Mudança',R.chg,true);y+=chH+6;
 const rc=R.nivel==='Alta'?[59,132,87]:R.nivel==='Moderada'?[183,121,31]:[181,64,46];
 need(20);txt('Confiabilidade das respostas: '+R.nivel+' ('+R.score+'/100)',10.5,{bold:true,color:rc});gap(1);bullets(R.notes,9);

 // análise gráfica
 h1('Análise gráfica DISC');
 ['estr','adap','res','chg'].forEach(k=>{const o={estr:R.estr,adap:R.adap,res:R.res,chg:R.chg}[k];need(24);
  txt('Gráfico '+GRAPHS[k].n+':  '+F.map(f=>f+' '+(k==='chg'&&o[f]>0?'+':'')+o[f]+'%').join('   '),10.5,{bold:true});gap(1);txt(GRAPHS[k].d,9.6,{color:mut});gap(4)});

 h2('Pessoa e talento');
 txt('Comparamos o seu gráfico Estrutural com 24 perfis de referência. O talento mais próximo é '+E.top.n+', com '+E.top.sim+'% de semelhança. Ele é o que provavelmente exige menos esforço de você, mas não é o único compatível.',10);gap(3);
 need(22);const c0=50,cwT=(CW-c0)/4;doc.setFont('helvetica','bold');doc.setFontSize(8);col(mut);F.forEach((f,k)=>doc.text(f,M+c0+cwT*k+cwT/2,y+3,{align:'center'}));y+=5;
 [['Você (estrutural)',F.map(f=>R.estr[f])],[E.top.n,E.top.v]].forEach(r=>{draw(line);doc.line(M,y,W-M,y);doc.setFont('helvetica','normal');doc.setFontSize(9.5);col(ink);doc.text(r[0],M,y+5);r[1].forEach((v,k)=>doc.text(v+'%',M+c0+cwT*k+cwT/2,y+5,{align:'center'}));y+=7.5});
 gap(3);label('Todos os talentos, do mais ao menos parecido');
 const half=Math.ceil(R.tal.length/2),colW=(CW-10)/2;need(half*5.6+4);const ty=y;
 R.tal.forEach((t,i)=>{const cx=M+(i<half?0:colW+10),yy=ty+(i%half)*5.6;doc.setFont('helvetica',i===0?'bold':'normal');doc.setFontSize(9);col(ink);doc.text(t.n,cx,yy+3.5);
  bar(cx+colW-38,yy+1.8,26,t.sim,ink);doc.setFont('helvetica','normal');col(mut);doc.text(t.sim+'%',cx+colW,yy+3.5,{align:'right'})});
 y=ty+half*5.6+2;

 h1('Análise descritiva');
 label('Resumo do seu comportamento · gráfico Resultante');txt(E.resumo,10.3);gap(2);txt(E.comboR,10.3);
 label('Como você se motiva · gráfico Estrutural');txt(E.pe.P.motivacao,10.3);
 label('Como gostaria de ser gerenciado · gráfico Estrutural');txt(E.pe.P.gestao,10.3);
 label('Como você se comunica · gráfico Resultante');txt(E.pr.P.comunica,10.3);
 label('Ambiente ideal');txt(E.pe.P.amb,10.3);
 label('Maior receio');txt(E.pe.P.medo,10.3);
 label('Estilo de decisão');txt(E.pr.P.dec,10.3);
 h2('Pontos fortes');bullets(E.fortes);
 h2('Pontos de atenção');bullets(E.atencao);

 [['estr','Estrutural'],['adap','Adaptado'],['res','Resultante']].forEach(([k,n])=>{
  h1('Análise isolada dos fatores · '+n);
  const o={estr:R.estr,adap:R.adap,res:R.res}[k];
  F.forEach(f=>{const v=o[f],b=band(v);need(30);const t=y;
   fill(HEX[f]);doc.roundedRect(M,t,9,9,1.5,1.5,'F');doc.setTextColor(255,255,255);doc.setFont('helvetica','bold');doc.setFontSize(12);doc.text(f,M+4.5,t+6.3,{align:'center'});
   col(ink);doc.setFontSize(11);doc.text(INFO[f].nome+': '+v+'%   ·   '+b.l,M+13,t+3.8);bar(M+13,t+5.8,CW-13,v,HEX[f]);
   y=t+10.5;txt(FTXT[f][b.k],9.8,{x:M+13,w:CW-13});gap(5)});
 });

 h1('Subfatores de comportamento');
 txt('Calculados pela diferença entre pares de fatores no gráfico Estrutural. Use as perguntas para refletir sobre situações reais da sua vida.',9.5,{color:mut});gap(3);
 F.forEach(f=>R.subs.filter(s=>s.x===f).forEach(s=>{need(44);
  txt(s.n+'   '+s.v+'%  ·  '+subLevel(s.v),11,{bold:true,color:HEX[f]});bar(M,y+0.8,CW,s.v,HEX[f]);gap(4);
  txt(s.def,9,{italic:true,color:mut});gap(1);txt(s[subKey(s.v)],9.8);gap(1.5);
  txt('Perguntas para reflexão',8.5,{bold:true,color:mut});gap(0.5);
  s.q.forEach((q,i)=>{txt((i+1)+'. '+q,9.2,{x:M+3,w:CW-3})});gap(5)}));

 h1('Adaptação e pressão');
 label('Esforço de adaptação · '+R.adapIdx+' pontos');txt(E.adapTxt,10.3);gap(2);
 if(E.chgLines.length)bullets(E.chgLines);else txt('Nenhum fator muda mais de 10 pontos entre o seu jeito natural e o que o ambiente pede.',10.3);
 label('Sob pressão intensa');txt(E.pressTxt,10.3);gap(1);txt('Em momentos de estresse, sobra pouca energia para adaptação e o estilo Estrutural tende a aparecer com mais força.',9.2,{color:mut});
 h2('Como se comunicar com você');label('Funciona');bullets(E.cs);label('Evite');bullets(E.cn);
 h2('Para se desenvolver');bullets(E.pr.P.dev);
 h2('Como você se dá com outros perfis');
 F.forEach(f=>{need(14);txt('Com perfis de '+INFO[f].nome,10,{bold:true,color:HEX[f]});txt(REL[E.codeR[0]][f],10);gap(2.5)});

 h1('Metodologia');
 METODO.forEach(m=>{need(16);txt(m[0],10.5,{bold:true});gap(0.5);txt(m[1],9.6,{color:mut});gap(3.5)});
 gap(4);txt('Este relatório descreve preferências de comportamento a partir das respostas de hoje. Perfis mudam com contexto, fase de vida e função. Use como ponto de partida para reflexão e conversa, nunca como rótulo.',8.8,{color:mut});

 const n=doc.getNumberOfPages();
 for(let i=1;i<=n;i++){doc.setPage(i);doc.setFont('helvetica','normal');doc.setFontSize(8);col(mut);doc.text('Teste DISC'+(st.nome?'  ·  '+st.nome:'')+'  ·  '+E.dt,M,H-9);doc.text(i+' / '+n,W-M,H-9,{align:'right'})}
 return doc;
}
async function doPDF(){
 if(!R||!DL)return;
 if(!window.jspdf){toast('Não consegui carregar o gerador de PDF. Recarregue a página e tente de novo.');return}
 const b=$('pdf');b.disabled=true;b.textContent='Gerando PDF...';
 try{
  const blob=buildPDF().output('blob');
  const nm='Relatorio DISC'+(st.nome?' - '+st.nome.replace(/[\\/:*?"<>|]/g,''):'')+'.pdf';
  await DL.save({filename:nm,data:blob});toast('PDF salvo');
 }catch(e){const c=e&&e.code;
  if(c==='declined')toast('Download cancelado');
  else if(c==='rate_limited')toast('Aguarde um instante e tente de novo');
  else if(['unavailable','not_granted','capability_disabled','capability_removed'].includes(c)){toast('Download indisponível nesta visualização');b.hidden=true}
  else toast('Não foi possível gerar o PDF');
 }finally{b.disabled=false;b.textContent='Baixar PDF'}
}
})();
