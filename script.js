const nav=document.getElementById('nav'),mb=document.getElementById('menu');
mb.addEventListener('click',()=>{const o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}));
document.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>{
document.querySelectorAll('.tabs button').forEach(x=>x.setAttribute('aria-pressed',x===b));
document.querySelectorAll('.w').forEach(w=>w.hidden=b.dataset.f!=='all'&&w.dataset.c!==b.dataset.f)}));
document.querySelectorAll('[data-pick]').forEach(a=>a.addEventListener('click',()=>{document.getElementById('s').value=a.dataset.pick}));
document.getElementById('fm').addEventListener('submit',e=>{e.preventDefault();
const t='Hello Safwan Studios, I want to order: '+document.getElementById('s').value+'.\nName: '+document.getElementById('n').value+'\nDetails: '+document.getElementById('m').value;
waGo('https://wa.me/923171022977?text='+encodeURIComponent(t))});
const cs=document.getElementById('cs'),cq=document.getElementById('cq'),ct=document.getElementById('ct');
const total=()=>{const q=Math.max(1,Math.min(100,parseInt(cq.value)||1));return q*Number(cs.value)};
const upd=()=>{ct.textContent='PKR '+total().toLocaleString('en-US');ct.classList.remove('bump');void ct.offsetWidth;ct.classList.add('bump')};
cs.addEventListener('change',upd);cq.addEventListener('input',upd);
document.getElementById('cb').addEventListener('click',()=>{
const q=Math.max(1,Math.min(100,parseInt(cq.value)||1));
const t='Hello Safwan Studios, I want '+q+' x '+cs.options[cs.selectedIndex].text.split(' (')[0]+'. Estimated total: PKR '+total().toLocaleString('en-US')+'.';
waGo('https://wa.me/923171022977?text='+encodeURIComponent(t))});
const th=document.getElementById('theme'),root=document.documentElement;
const isDark=()=>root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
const SUN='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',MOON='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
const lab=()=>{const d=isDark();th.innerHTML=d?SUN:MOON;th.setAttribute('aria-label',d?'Switch to light mode':'Switch to dark mode')};lab();
th.addEventListener('click',()=>{root.dataset.theme=isDark()?'light':'dark';lab()});
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);setTimeout(()=>e.target.style.transitionDelay='0s',1200)}}),{threshold:.12});
document.querySelectorAll('.head,.card,.steps li,details,.trust .wrap>div,.w,.calc,.info,.fm').forEach((el,i)=>{el.classList.add('rv');el.style.transitionDelay=(i%4)*0.08+'s';io.observe(el)})}
const openLb=t=>{const s=t.querySelector('svg');if(!s)return;const lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-label','Design preview');
const c=s.cloneNode(true);c.removeAttribute('aria-hidden');lb.appendChild(c);const x=document.createElement('button');x.textContent='×';x.setAttribute('aria-label','Close');lb.appendChild(x);
const close=()=>{lb.remove();removeEventListener('keydown',k);t.focus()};const k=e=>{if(e.key==='Escape')close()};
lb.addEventListener('click',close);addEventListener('keydown',k);document.body.appendChild(lb);x.focus()};
document.querySelectorAll('.w.d').forEach(t=>{t.addEventListener('click',()=>openLb(t));t.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLb(t)}})});
if(matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches)document.querySelectorAll('.card,.w.d,.mock svg').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform='perspective(800px) rotateX('+(-y*12).toFixed(1)+'deg) rotateY('+(x*14).toFixed(1)+'deg) translateY(-4px)'});el.addEventListener('pointerleave',()=>{el.style.transform=''})});
const A=document.getElementById('auth'),FL=document.getElementById('flip'),fL=document.getElementById('fl'),fS=document.getElementById('fs'),toast=document.getElementById('toast');
let lastF=null;
const ls={g(k){try{return localStorage.getItem(k)}catch(e){return null}},s(k,v){try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v);return true}catch(e){return false}}};
const users=()=>{try{return JSON.parse(ls.g('ss_users')||'{}')}catch(e){return{}}};
const hsh=async(pw,salt)=>{if(!(window.crypto&&crypto.subtle))throw 0;const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(salt+pw));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')};
const say=m=>{toast.textContent=m;toast.classList.add('on');setTimeout(()=>toast.classList.remove('on'),3200)};
const setMode=m=>{const su=m==='signup';FL.classList.toggle('s',su);fL.inert=su;fS.inert=!su;document.getElementById('lerr').textContent='';document.getElementById('serr').textContent='';setTimeout(()=>document.getElementById(su?'sn':'le').focus(),su?420:60)};
const openA=m=>{if(!A.classList.contains('open')){lastF=document.activeElement;A.classList.add('open')}setMode(m)};
const closeA=()=>{A.classList.remove('open');if(lastF)lastF.focus()};
const ui=()=>{const e=ls.g('ss_session'),u=e&&users()[e];document.getElementById('nl').hidden=!!u;document.getElementById('nu').hidden=!u;if(u){document.getElementById('un').textContent='Hi, '+u.name.split(' ')[0];const n=document.getElementById('n');if(n&&!n.value)n.value=u.name}};
document.querySelectorAll('[data-auth]').forEach(b=>b.addEventListener('click',()=>{nav.classList.remove('open');mb.setAttribute('aria-expanded','false');openA(b.dataset.auth)}));
document.getElementById('ax').addEventListener('click',closeA);
A.addEventListener('click',e=>{if(e.target===A)closeA()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&A.classList.contains('open'))closeA()});
document.getElementById('lo').addEventListener('click',()=>{ls.s('ss_session',null);ui();say('You are logged out')});
document.getElementById('sf').addEventListener('submit',async e=>{e.preventDefault();const er=document.getElementById('serr'),nm=document.getElementById('sn').value.trim(),em=document.getElementById('se').value.trim().toLowerCase(),pw=document.getElementById('sp').value,cf=document.getElementById('sc').value;
if(nm.length<2)return er.textContent='Please enter your name.';if(!/^\S+@\S+\.\S+$/.test(em))return er.textContent='Please enter a valid email.';if(pw.length<6)return er.textContent='Password must be at least 6 characters.';if(pw!==cf)return er.textContent='Passwords do not match.';
const us=users();if(us[em])return er.textContent='This email already has an account. Please login.';
await loading(['Checking your details…','Creating your account…','Almost ready…']);try{const salt=Math.random().toString(36).slice(2)+Date.now();us[em]={name:nm,salt,h:await hsh(pw,salt)};if(!ls.s('ss_users',JSON.stringify(us))||!ls.s('ss_session',em))return er.textContent='Could not save the account in this browser.'}catch(x){return er.textContent='Sign up is not supported in this browser.'}
e.target.reset();ui();closeA();say('Welcome, '+nm.split(' ')[0]+'! Your account is ready.')});
document.getElementById('lf').addEventListener('submit',async e=>{e.preventDefault();const er=document.getElementById('lerr'),em=document.getElementById('le').value.trim().toLowerCase(),pw=document.getElementById('lp').value,u=users()[em];
if(!u)return er.textContent='No account found with this email.';
let ok=false;try{ok=await hsh(pw,u.salt)===u.h}catch(x){return er.textContent='Login is not supported in this browser.'}if(!ok)return er.textContent='Wrong password. Please try again.';await loading(['Checking your details…','Verifying password…','Logging you in…']);
ls.s('ss_session',em);e.target.reset();ui();closeA();say('Welcome back, '+u.name.split(' ')[0]+'!')});
fS.inert=true;ui();
addEventListener('scroll',()=>document.querySelector('header.top').classList.toggle('sc',scrollY>10),{passive:true});
if('IntersectionObserver' in window){const links=[...document.querySelectorAll('nav>a[href^="#"]:not(.btn)')],secs=links.map(a=>document.querySelector(a.getAttribute('href')));
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach((a,i)=>a.classList.toggle('act',secs[i]===e.target))}),{rootMargin:'-45% 0px -50% 0px'});secs.forEach(x=>x&&so.observe(x))}
if(matchMedia('(hover:hover) and (pointer:fine)').matches){
const d=document.createElement('div'),r=document.createElement('div'),sp=document.createElement('span'),de=document.documentElement,rd=matchMedia('(prefers-reduced-motion: reduce)').matches;
d.className='cd';r.className='cr';r.appendChild(sp);d.setAttribute('aria-hidden','true');r.setAttribute('aria-hidden','true');document.body.append(d,r);
let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y,on=false;
addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;if(!on){on=true;rx=x;ry=y;de.classList.add('cc')}de.classList.remove('out');d.style.transform='translate('+x+'px,'+y+'px)'},{passive:true});
(function loop(){rx+=(x-rx)*(rd?1:.17);ry+=(y-ry)*(rd?1:.17);r.style.transform='translate('+rx+'px,'+ry+'px)';requestAnimationFrame(loop)})();
document.addEventListener('mouseover',e=>{const v=e.target.closest('.w.d'),h=e.target.closest('a,button,summary,select,label,[role=button]'),t=e.target.closest('input,textarea');r.classList.toggle('v',!!v);r.classList.toggle('h',!!h&&!v);r.classList.toggle('t',!!t);sp.textContent=v?'View':''});
de.addEventListener('mouseleave',()=>de.classList.add('out'));
addEventListener('mousedown',()=>r.classList.add('p'));addEventListener('mouseup',()=>r.classList.remove('p'));
if(!rd)addEventListener('click',e=>{const i=document.createElement('i');i.className='rp';i.style.left=e.clientX+'px';i.style.top=e.clientY+'px';document.body.appendChild(i);i.addEventListener('animationend',()=>i.remove())});
}
let busy=false;
const loading=(steps,ms=5000)=>new Promise(res=>{busy=true;if(document.activeElement)document.activeElement.blur();const E=document.getElementById('ld'),T=document.getElementById('ldt'),B=document.getElementById('ldb'),P=document.getElementById('ldp'),t0=Date.now();E.classList.add('on');
const tick=()=>{const p=Math.min(1,(Date.now()-t0)/ms);B.style.width=p*100+'%';P.textContent=Math.round(p*100)+'%';T.textContent=steps[Math.min(steps.length-1,Math.floor(p*steps.length))];if(p>=1){clearInterval(iv);E.classList.remove('on');busy=false;res()}};
const iv=setInterval(tick,50);tick()});
const pg=u=>'<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Opening WhatsApp…</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#050506;color:#fff;font-family:system-ui,sans-serif;text-align:center}.o{position:relative;width:110px;height:110px;margin:0 auto 24px;display:grid;place-items:center}.o i{position:absolute;border-radius:50%;border:4px solid transparent;animation:s 1.2s linear infinite}.o .a{inset:0;border-top-color:#f0cf65;border-right-color:#f0cf65}.o .b{inset:14px;border-bottom-color:#b8b2a0;border-left-color:#b8b2a0;animation-direction:reverse}.o .c{inset:28px;border-top-color:#fff}.o b{width:48px;height:48px;border-radius:13px;background:#d4af37;display:grid;place-items:center;font:800 26px system-ui;color:#111;box-shadow:0 6px 0 #8a6d12}h1{font-size:20px;margin:0 0 14px}.bar{width:min(80vw,300px);height:8px;border-radius:8px;background:#ffffff26;margin:0 auto 8px;overflow:hidden}.bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#d4af37,#fff0b0);animation:f 5s linear forwards}@keyframes s{to{transform:rotate(360deg)}}@keyframes f{to{width:100%}}p{color:#d9d3c0;font-size:14px;margin:0}</style></head><body><div><div class="o"><i class="a"></i><i class="b"></i><i class="c"></i><b>S</b></div><h1 id="t">Connecting…</h1><div class="bar"><i></i></div><p id="p">0%</p></div><script>var t0=Date.now(),m=["Connecting…","Preparing your WhatsApp chat…","Opening WhatsApp…"];setInterval(function(){var q=Math.min(1,(Date.now()-t0)/5000);document.getElementById("p").textContent=Math.round(q*100)+"%";document.getElementById("t").textContent=m[Math.min(2,Math.floor(q*3))]},100);setTimeout(function(){location.replace('+JSON.stringify(u)+')},5000)<\/script></body></html>';
const waGo=async(url,steps)=>{if(busy)return;let w=null;try{w=window.open('','_blank')}catch(e){}
if(w){try{w.document.open();w.document.write(pg(url));w.document.close()}catch(e){try{w.location.href=url}catch(x){}}}
await loading(steps||['Checking your details…','Preparing your message…','Opening WhatsApp…']);
if(!w){const tt=document.getElementById('toast');tt.innerHTML='<a href="'+url+'" target="_blank" rel="noopener">Tap here to open WhatsApp</a>';tt.classList.add('on','lk');tt.querySelector('a').addEventListener('click',()=>tt.classList.remove('on','lk'))}};
document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();waGo(a.href,['Connecting…','Preparing your WhatsApp chat…','Opening WhatsApp…'])}));
const up=document.getElementById('up');
addEventListener('scroll',()=>{up.hidden=scrollY<600},{passive:true});
up.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
