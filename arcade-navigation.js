/* VLADYERIK: controlador arcade único para teclado y DualShock 4. */
(()=>{'use strict';
window.__vladiUnifiedNavigation=true;
let selected=null,lastMove=0,prevConfirm=false,prevExit=false,neutralUntil=0;
const $=s=>document.querySelector(s);
const playing=()=>!$('#onlinePlayer')?.hidden||!$('#playerArea')?.hidden;
const selectors='header .add-games,header .topbar a,.online-card,.romcard,#retroOnline button,#retroOnline input,#retroOnline select,.tabs button,#featured button,#featured select,#collection button,#collection input:not([type=file]),#collection select,#selectionPanel button,#systemPanel select';
function targets(){return [...document.querySelectorAll(selectors)].filter(el=>{if(el.disabled||el.closest('[hidden]')||el.getAttribute('aria-hidden')==='true')return false;const r=el.getBoundingClientRect(),style=getComputedStyle(el);return r.width>0&&r.height>0&&style.visibility!=='hidden'&&style.display!=='none'});}
function clear(){document.querySelectorAll('.vladi-unified-focus').forEach(el=>el.classList.remove('vladi-unified-focus'));}
function focus(el){if(!el)return false;clear();selected=el;el.classList.add('vladi-unified-focus');if(!el.hasAttribute('tabindex')&&el.tagName==='LABEL')el.tabIndex=0;try{el.focus({preventScroll:true})}catch(_){}el.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});window.__vladiOnlinePadActive=!!el.closest('#retroOnline');return true;}
function current(){const items=targets();if(selected&&items.includes(selected))return selected;const active=document.activeElement;if(items.includes(active))return active;return null;}
function move(dir){const items=targets();if(!items.length)return;let el=current();if(!el){focus(items[0]);return}
 const r=el.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;let best=null,score=Infinity;
 for(const item of items){if(item===el)continue;const b=item.getBoundingClientRect(),xx=b.left+b.width/2-x,yy=b.top+b.height/2-y;
 const primary=dir==='right'?xx:dir==='left'?-xx:dir==='down'?yy:-yy;
 const secondary=dir==='right'||dir==='left'?Math.abs(yy):Math.abs(xx);
 if(primary<5)continue;
 const value=primary+secondary*2.1;
 if(value<score){score=value;best=item}
 }
 // En los extremos permitir continuar por orden visual sin encerrar el foco.
 if(!best){const sorted=[...items].sort((a,b)=>{const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();return Math.abs(ra.top-rb.top)>12?ra.top-rb.top:ra.left-rb.left});const i=sorted.indexOf(el);best=sorted[(i+(dir==='down'||dir==='right'?1:-1)+sorted.length)%sorted.length]}
 focus(best);
}
function confirm(){const el=current();if(!el){focus(targets()[0]);return}if(el.matches('input:not([type=file]),select')){el.focus();if(el.tagName==='SELECT')el.showPicker?.();return}if(el.matches('header .add-games')){$('#rom')?.click();return}el.click();}
function exit(){if(!$('#onlinePlayer')?.hidden){$('#onlineExit')?.click();neutralUntil=performance.now()+550;return}if(!$('#playerArea')?.hidden){$('#playerExit')?.click();neutralUntil=performance.now()+550;return}}
document.addEventListener('keydown',e=>{if(playing())return;const key=({w:'ArrowUp',a:'ArrowLeft',s:'ArrowDown',d:'ArrowRight'})[e.key.toLowerCase()]||e.key;
 if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter',' '].includes(key))return;
 if(e.target.matches('input:not([type=file]),textarea,select')&&e.target===document.activeElement){if(key==='Enter'&&e.target.tagName==='INPUT'){e.target.blur();focus(e.target);e.preventDefault();e.stopImmediatePropagation()}return}
 e.preventDefault();e.stopImmediatePropagation();
 if(key==='Enter'||key===' '){if(!e.repeat)confirm()}else move(key.slice(5).toLowerCase());
},true);
document.addEventListener('pointerdown',e=>{const t=e.target.closest(selectors);if(t)focus(t)},true);
function loop(now){const pads=[...(navigator.getGamepads?.()||[])].filter(Boolean);
 const pressed=i=>pads.some(p=>!!p.buttons?.[i]?.pressed);
 const exitHeld=pressed(8)||pressed(16);
 if(playing()){if(exitHeld&&!prevExit)exit();prevExit=exitHeld;prevConfirm=true;requestAnimationFrame(loop);return}
 if(now<neutralUntil){prevExit=exitHeld;prevConfirm=true;requestAnimationFrame(loop);return}
 prevExit=exitHeld;
 if(pads.length){const axis=i=>pads.find(p=>Math.abs(p.axes?.[i]||0)>.62)?.axes[i]||0;
 const dx=pressed(15)||axis(0)>.62?'right':pressed(14)||axis(0)<-.62?'left':null;
 const dy=pressed(13)||axis(1)>.62?'down':pressed(12)||axis(1)<-.62?'up':null;
 if(now-lastMove>190&&(dx||dy)){move(dx||dy);lastMove=now}
 const yes=[0,1,2,3,9].some(pressed);
 if(yes&&!prevConfirm&&!exitHeld)confirm();
 prevConfirm=yes;
 }else prevConfirm=false;
 requestAnimationFrame(loop);
}
const css=document.createElement('style');css.textContent='.vladi-unified-focus{outline:3px solid #ffd454!important;outline-offset:3px!important;box-shadow:0 0 0 5px rgba(255,212,84,.25)!important}';document.head.append(css);
requestAnimationFrame(loop);
})();