/* V&R shared motion & polish layer */
(function(){
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // scroll progress bar
  const bar=document.createElement('div');bar.className='progress';document.body.appendChild(bar);
  const onScroll=()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?scrollY/h:0)+')';};
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  // active nav link
  const page=(location.pathname.split('/').pop()||'index.html');
  const map={'gale.html':'projects.html','29th.html':'projects.html','seventh.html':'projects.html','losarcos.html':'projects.html','crossdale.html':'projects.html','randall.html':'projects.html','westadams.html':'projects.html','privacy.html':''};
  const cur=map[page]||page;
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(a=>{const h=a.getAttribute('href')||'';if(h===cur||(cur==='index.html'&&h==='index.html#home'))a.classList.add('active');});
  // stagger indices + observer
  document.querySelectorAll('.stagger').forEach(g=>[...g.children].forEach((c,i)=>c.style.setProperty('--i',i)));
  document.querySelectorAll('.wipe-group').forEach(g=>g.querySelectorAll('.wipe').forEach((c,i)=>c.style.setProperty('--i',i)));
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.stagger,.wipe,.eyebrow.line').forEach(el=>io.observe(el));
  // count-up stats
  const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);
    const el=e.target,m=el.innerHTML.trim().match(/^(\d+)([\s\S]*)$/);if(!m||reduce)return;const end=+m[1],suf=m[2];const t0=performance.now(),dur=1600;
    const step=t=>{const p=Math.min(1,(t-t0)/dur),v=Math.round(end*(1-Math.pow(1-p,3)));el.innerHTML=v+suf;if(p<1)requestAnimationFrame(step);};requestAnimationFrame(step);}),{threshold:.6});
  document.querySelectorAll('.stat .num').forEach(el=>cio.observe(el));
  // gentle parallax on background layers
  const par=[...document.querySelectorAll('[data-parallax]')];
  if(par.length&&!reduce){const tick=()=>{par.forEach(el=>{const r=el.parentElement.getBoundingClientRect();const k=parseFloat(el.dataset.parallax)||.08;let y=-(r.top+r.height/2-innerHeight/2)*k;y=Math.max(-r.height*.06,Math.min(r.height*.06,y));el.style.transform='translate3d(0,'+y.toFixed(1)+'px,0) scale(1.14)';});};addEventListener('scroll',()=>requestAnimationFrame(tick),{passive:true});tick();}
  // soft page transitions for internal pages
  document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank')return;
    const href=a.getAttribute('href')||'';if(!/^[\w-]+\.html$/.test(href))return;
    e.preventDefault();document.body.classList.add('leaving');setTimeout(()=>{location.href=href;},300);});
  addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('leaving');});
})();
