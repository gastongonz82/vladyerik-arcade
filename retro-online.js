/* VLADYERIK RETRO ONLINE: módulo independiente de la biblioteca local. */
(()=>{'use strict';
const host=document.querySelector('main');if(!host)return;
const base='https://gastongonz82.github.io/vladyerik-retro-games/';
const style=document.createElement('style');style.textContent=`
#retroOnline{margin:24px 0 30px;padding:20px;border:1px solid #557fc1;border-radius:20px;background:linear-gradient(115deg,#152d5b,#15152f)}
#retroOnline h2{margin:0 0 8px;color:#ffe078}#retroOnline .online-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:12px;margin-top:16px}
#retroOnline .online-card{padding:17px;text-align:left;min-height:125px;background:#152c54;border:1px solid #5278b4;border-radius:14px;color:white}
#retroOnline .online-card strong{display:block;margin:10px 0;font-size:15px}#retroOnline .online-card small{color:#b5eaff}
#onlinePlayer{position:fixed;inset:0;z-index:10010;background:#050916;display:flex;flex-direction:column;align-items:stretch;overflow:hidden}
#onlinePlayer[hidden]{display:none}#onlinePlayer .online-top{flex:0 0 auto;min-height:58px;box-sizing:border-box;padding:8px 16px;display:flex;justify-content:space-between;gap:12px;align-items:center;background:linear-gradient(100deg,#101c38,#13254a);border-bottom:1px solid #395487;color:#ffe078;font-size:13px}#onlinePlayer .online-top strong{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px}#onlinePlayer .online-top .online-actions{display:flex;align-items:center;gap:7px;flex:0 0 auto}
#onlinePlayer iframe{border:0;display:block;flex:0 0 auto;min-height:0;background:#000;max-width:none;max-height:none}
#onlinePlayer button{background:#1a2d51;color:#e9f2ff;font-weight:800;font-size:12px;padding:0 11px;height:38px;border-radius:9px;border:1px solid #4a6ba4;white-space:nowrap}#onlinePlayer #onlineExit{background:#ffcc52;color:#142039;border-color:#ffdd85}#onlinePlayer select{background:#0c1b39;color:#ffdf73;font-weight:850;padding:8px;border-radius:8px;border:1px solid #5786c4}#onlinePlayer .online-top{flex-wrap:nowrap}#onlinePlayer .online-top label{display:flex;align-items:center;gap:6px;color:#c9e9ff;font-weight:800;background:#182a50;border:1px solid #405f95;border-radius:9px;height:38px;box-sizing:border-box;padding:4px 7px;white-space:nowrap;font-size:11px}#onlinePlayer .online-top select{max-width:145px;font-size:11px;height:29px;padding:3px 6px}#onlinePlayer .online-top #onlineExit{background:#4b2534;color:#ffdfde;border-color:#98566c}#onlinePlayer.immersive .online-top{display:none}#onlinePlayer.immersive iframe{height:100%!important}#onlinePlayer #onlineRestore{display:none;position:absolute;top:12px;right:14px;z-index:10;background:#111c37dd;color:#ffe074;border:1px solid #6189d5}#onlinePlayer.immersive #onlineRestore{display:block}@media(max-width:720px){#onlinePlayer .online-top{padding:6px;gap:4px}#onlinePlayer .online-top strong{font-size:11px}#onlinePlayer .online-top label{font-size:0}#onlinePlayer .online-top button{padding:0 7px;font-size:11px}}

#onlinePlayer .online-top .online-actions{display:flex!important;align-items:center!important;gap:7px!important}
#onlinePlayer .online-top .online-actions label{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;margin:0!important;vertical-align:middle!important;line-height:1!important;height:38px!important;min-height:38px!important;padding:4px 7px!important;box-sizing:border-box!important}
#onlinePlayer .online-top .online-actions label select{display:block!important;height:28px!important;min-height:28px!important;line-height:normal!important;margin:0!important;vertical-align:middle!important}
#onlinePlayer .online-top .online-actions button{display:inline-flex!important;align-items:center!important;justify-content:center!important;height:38px!important;min-height:38px!important;box-sizing:border-box!important;margin:0!important;line-height:1!important}

#retroOnline .online-tools{display:flex;gap:9px;align-items:center;flex-wrap:wrap;margin:15px 0 5px}
#retroOnline .online-tools input,#retroOnline .online-tools select{background:#0b1939;color:#f4f7ff;border:1px solid #547eb9;border-radius:10px;padding:11px 12px;min-height:42px;font:inherit}
#retroOnline .online-tools input{flex:1 1 240px;min-width:150px}
#retroOnline .online-tools select{flex:0 1 180px}
#retroOnline .online-tools button,#retroOnline .online-filters button{border:1px solid #547eb9;border-radius:10px;background:#172f58;color:#ffdc74;padding:10px 13px;font-weight:850;cursor:pointer}
#retroOnline .online-filters{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
#retroOnline .online-filters button.active,#retroOnline .online-tools button.active{background:linear-gradient(#ffe78a,#ffc342);color:#122348;border-color:#ffdf72}
#retroOnline .online-grid{grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:14px}
#retroOnline .online-card{position:relative;display:flex;flex-direction:column;align-items:stretch;padding:0;min-height:245px;overflow:hidden;text-align:left;cursor:pointer;transition:transform .18s,border-color .18s,box-shadow .18s}
#retroOnline .online-card:hover,#retroOnline .online-card:focus-visible{transform:translateY(-5px);border-color:#ffdd6e;box-shadow:0 12px 30px #0008,0 0 0 2px #ffcf4270;outline:0}
#retroOnline .online-art{display:flex;align-items:center;justify-content:center;height:142px;background:radial-gradient(circle at 50% 30%,#305899,#101d42 80%);font-size:52px}
#retroOnline .online-info{padding:11px 12px 13px;display:flex;flex-direction:column;gap:7px;flex:1}
#retroOnline .online-card strong{margin:0;font-size:13px;line-height:1.35;overflow-wrap:anywhere}
#retroOnline .online-card small{margin-top:auto;font-size:11px;font-weight:800}
#retroOnline .online-fav{position:absolute;right:8px;top:8px;z-index:2;background:#0a193dcc;border:1px solid #6d8ebd;color:#fff;border-radius:9px;font-size:19px;width:34px;height:34px;cursor:pointer}
#retroOnline .online-fav[aria-pressed="true"]{color:#ffcf42;border-color:#ffcf42}
#retroOnline .online-empty{padding:24px;text-align:center;color:#c4d9f6}
@media(max-width:600px){#retroOnline{padding:13px}#retroOnline .online-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}#retroOnline .online-art{height:115px}#retroOnline .online-card{min-height:210px}}

#retroOnline .online-view-toggle{display:inline-flex;gap:4px;padding:4px;border:1px solid #466ca5;border-radius:11px;background:#0d1d3e}
#retroOnline .online-view-toggle button{border:0;background:transparent;color:#c9e4ff;padding:9px 12px;border-radius:8px;font-size:12px;font-weight:900;cursor:pointer}
#retroOnline .online-view-toggle button.active{background:linear-gradient(#ffe589,#ffbd32);color:#14213c}
#retroOnline .online-feature{display:grid;grid-template-columns:minmax(180px,34%) minmax(0,1fr);gap:25px;align-items:center;margin:16px 0 22px;padding:22px;border:1px solid #5687ca;border-radius:22px;background:linear-gradient(110deg,#1a356d,#141c43 65%,#291843);box-shadow:0 20px 50px #0006}
#retroOnline .online-feature-art{height:245px;display:grid;place-items:center;border-radius:16px;background:radial-gradient(circle,#375ca1,#121e45);font-size:88px}
#retroOnline .online-feature-tag{color:#89e6ff;font-weight:900;font-size:12px;letter-spacing:.08em}
#retroOnline .online-feature h3{font-size:clamp(25px,3.4vw,48px);font-weight:1000;font-style:italic;text-transform:uppercase;line-height:1.08;margin:12px 0;color:#fff}
#retroOnline .online-feature-actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:18px}
#retroOnline .online-feature-actions button{background:#162b52;border:1px solid #5c81bb;color:white;padding:12px 16px;border-radius:10px;font-weight:900;cursor:pointer}
#retroOnline .online-feature-actions button:first-child{background:linear-gradient(#ffe589,#ffbd32);color:#152340;border:0}
#retroOnline .online-grid.console-mode{display:flex;flex-direction:column;gap:9px}
#retroOnline .online-grid.console-mode .online-card{min-height:88px;display:grid;grid-template-columns:100px minmax(0,1fr);align-items:center}
#retroOnline .online-grid.console-mode .online-art{height:86px;font-size:37px}
#retroOnline .online-grid.console-mode .online-info{padding:10px 48px 10px 14px}
@media(max-width:650px){#retroOnline .online-feature{grid-template-columns:1fr;gap:12px;padding:14px}#retroOnline .online-feature-art{height:150px;font-size:65px}#retroOnline .online-feature h3{font-size:28px}}

/* Igualar proporciones del destacado a #featured de la biblioteca local */
#retroOnline .online-feature{grid-template-columns:minmax(190px,34%) minmax(0,1fr)!important;gap:28px!important;min-height:300px!important;padding:24px!important;box-sizing:border-box!important}
#retroOnline .online-feature-art{height:270px!important;font-size:100px!important}
#retroOnline .online-feature h3{font-size:clamp(27px,4vw,59px)!important;line-height:1.08!important}
#retroOnline .online-feature-actions{margin-top:25px!important;gap:12px!important}
#retroOnline .online-feature-actions button:first-child{font-size:17px!important;padding:16px 24px!important}
#retroOnline .online-grid.console-mode{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;align-items:stretch!important;gap:16px!important;overflow-x:auto!important;overflow-y:hidden!important;padding:12px 7px 24px!important;scroll-snap-type:x proximity!important;scrollbar-color:#ffc74c #121c45!important;scrollbar-width:thin!important;overscroll-behavior-x:contain!important;-webkit-overflow-scrolling:touch!important}
#retroOnline .online-grid.console-mode .online-card{display:flex!important;flex-direction:column!important;flex:0 0 clamp(175px,18vw,260px)!important;width:clamp(175px,18vw,260px)!important;min-height:0!important;height:auto!important;scroll-snap-align:center!important;grid-template-columns:none!important}
#retroOnline .online-grid.console-mode .online-art{width:100%!important;height:clamp(200px,22vw,295px)!important;min-height:0!important;font-size:65px!important;border-bottom:1px solid #45639a!important}
#retroOnline .online-grid.console-mode .online-info{display:flex!important;min-height:94px!important;padding:13px 12px 15px!important}
@media(max-width:650px){#retroOnline .online-feature{grid-template-columns:1fr!important;gap:12px!important;padding:14px!important}#retroOnline .online-feature-art{height:190px!important;font-size:75px!important}#retroOnline .online-feature h3{font-size:clamp(25px,7vw,36px)!important}#retroOnline .online-grid.console-mode .online-card{flex-basis:190px!important;width:190px!important}}

#retroOnline .online-art{position:relative;overflow:hidden}
#retroOnline .online-art img,#retroOnline .online-feature-art img{display:block;width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 9px 16px #0009);transition:transform .25s ease}
#retroOnline .online-art img{padding:12px 14px;box-sizing:border-box}
#retroOnline .online-card:hover .online-art img{transform:scale(1.06)}
#retroOnline .online-feature-art{overflow:hidden}
#retroOnline .online-feature-art img{padding:14px 20px;box-sizing:border-box}
#retroOnline .online-card .online-art:after{content:'';position:absolute;inset:auto 0 0;height:35%;pointer-events:none;background:linear-gradient(transparent,#07132d4d)}
#retroOnline .online-art .online-fallback,#retroOnline .online-feature-art .online-fallback{display:grid;place-items:center;width:100%;height:100%;font-size:clamp(40px,5vw,74px);font-weight:1000;color:#ffe28d;text-shadow:0 4px 18px #0008}
#retroOnline .online-card small{color:#91dcff;letter-spacing:.07em}

/* Tarjetas premium: arte centrado, marco consistente y tamaño legible */
#retroOnline .online-grid:not(.console-mode){grid-template-columns:repeat(auto-fill,minmax(215px,1fr))!important;gap:18px!important}
#retroOnline .online-card{border:1px solid #5279b4!important;border-radius:17px!important;background:linear-gradient(145deg,#182e58,#111f40)!important;box-shadow:0 8px 0 #070e24,0 12px 22px #0004!important;isolation:isolate}
#retroOnline .online-card:hover{border-color:#ffe078!important;box-shadow:0 8px 0 #070e24,0 18px 30px #0007,0 0 0 1px #ffe078!important}
#retroOnline .online-grid:not(.console-mode) .online-card{min-height:315px!important}
#retroOnline .online-art{height:225px!important;min-height:225px!important;width:100%!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important;background:radial-gradient(ellipse at center,#28467e 0%,#12254c 62%,#0b1734 100%)!important}
#retroOnline .online-art img{display:block!important;position:relative!important;max-width:calc(100% - 24px)!important;max-height:calc(100% - 24px)!important;width:auto!important;height:auto!important;object-fit:contain!important;object-position:center center!important;margin:auto!important;padding:0!important;filter:drop-shadow(0 10px 12px #0009)!important}
#retroOnline .online-art .online-fallback{display:flex!important;align-items:center!important;justify-content:center!important;margin:auto!important}
#retroOnline .online-art:after{display:none!important}
#retroOnline .online-info{min-height:88px!important;padding:13px 14px 15px!important;gap:10px!important}
#retroOnline .online-card strong{font-size:14px!important;line-height:1.35!important}
#retroOnline .online-card small{font-size:11px!important}
#retroOnline .online-fav{right:9px!important;top:9px!important;display:flex!important;align-items:center!important;justify-content:center!important;width:38px!important;height:38px!important;border-radius:10px!important;background:#09172de8!important;color:#fff!important;font-size:24px!important;line-height:1!important;box-shadow:0 3px 10px #0008!important}
#retroOnline .online-fav[aria-pressed="true"]{color:#ffdb64!important}
#retroOnline .online-grid.console-mode .online-art{height:clamp(220px,24vw,310px)!important;min-height:0!important}
#retroOnline .online-feature-art{display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important}
#retroOnline .online-feature-art img{width:auto!important;height:auto!important;max-width:calc(100% - 28px)!important;max-height:calc(100% - 22px)!important;object-fit:contain!important;object-position:center!important;padding:0!important;margin:auto!important}
@media(max-width:620px){#retroOnline .online-grid:not(.console-mode){grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:11px!important}#retroOnline .online-grid:not(.console-mode) .online-card{min-height:250px!important}#retroOnline .online-grid:not(.console-mode) .online-art{height:165px!important;min-height:165px!important}#retroOnline .online-info{padding:10px!important}#retroOnline .online-card strong{font-size:12px!important}}

/* Destacado online: misma altura y presencia visual que el destacado local */
#retroOnline .online-feature{min-height:370px!important;align-items:center!important;padding:24px!important}
#retroOnline .online-feature-art{height:330px!important;min-height:330px!important;align-self:stretch!important;border:1px solid #466ca4!important;border-radius:17px!important;background:radial-gradient(ellipse at 50% 40%,#294b88 0%,#142c5b 56%,#081630 100%)!important}
#retroOnline .online-feature-art img{max-height:calc(100% - 24px)!important;max-width:calc(100% - 24px)!important;object-fit:contain!important}
#retroOnline .online-feature .online-feature-tag{font-size:13px!important}
@media(max-width:650px){#retroOnline .online-feature{min-height:0!important}#retroOnline .online-feature-art{height:240px!important;min-height:240px!important}}
`;document.head.append(style);
const section=document.createElement('section');section.id='retroOnline';section.innerHTML='<h2>🌐 RETRO ONLINE</h2><p class="hint">Juegos disponibles para jugar directamente, sin subir archivos.</p><div id="onlineStatus" role="status">Cargando catálogo…</div><div class="online-grid" id="onlineGrid"></div>';
const nav=document.querySelector('.tabs');nav?.before(section);
const collection=document.querySelector('#collection .collection-title h2');if(collection)collection.textContent='📂 CARGAR MIS JUEGOS · COLECCIÓN LOCAL';
const player=document.createElement('div');player.id='onlinePlayer';player.hidden=true;player.innerHTML='<div class="online-top"><strong id="onlinePlaying">🎮 RETRO ONLINE</strong><div class="online-actions"><label>▣ IMAGEN <select id="onlineAspect"><option value="fit">AJUSTAR</option><option value="original">ORIGINAL 4:3</option><option value="wide">WIDESCREEN 16:9</option></select></label><button id="onlineFullscreen" type="button">⛶ PANTALLA COMPLETA</button><button id="onlineExit" type="button">✕ SALIR</button></div></div><button id="onlineRestore" type="button">⚙ MOSTRAR CONTROLES</button><iframe title="Emulador retro online" allow="fullscreen; gamepad" allowfullscreen></iframe>';document.body.append(player);
const status=section.querySelector('#onlineStatus'),grid=section.querySelector('#onlineGrid'),frame=player.querySelector('iframe');
const feature=document.createElement('div');feature.className='online-feature';feature.innerHTML='<div class="online-feature-art" id="onlineFeatureArt">🎮</div><div><div class="online-feature-tag" id="onlineFeatureSystem">🌟 JUEGO DESTACADO · RETRO ONLINE</div><h3 id="onlineFeatureName">ELEGÍ TU PRÓXIMA AVENTURA</h3><p id="onlineFeatureHint" class="hint">Seleccioná un juego para empezar.</p><div class="online-feature-actions"><button type="button" id="onlineFeaturePlay">▶ JUGAR AHORA</button><button type="button" id="onlineFeatureFav">☆ FAVORITO</button><button type="button" id="onlineFeatureNext">↻ OTRO DESTACADO</button></div></div>';section.insertBefore(feature,section.querySelector('#onlineGrid'));const toolsBar=document.createElement('div');toolsBar.className='online-tools';toolsBar.innerHTML='<input id="onlineSearch" type="search" placeholder="⌕ Buscar juegos online…" aria-label="Buscar juegos online"><select id="onlineSort" aria-label="Ordenar juegos"><option value="az">Nombre A → Z</option><option value="za">Nombre Z → A</option><option value="console">Por consola</option><option value="size">Tamaño mayor a menor</option></select><button id="onlineGridView" type="button" class="active">▦ TODOS</button><button id="onlineFavView" type="button">★ FAVORITOS</button><button id="onlineRecentView" type="button">◷ RECIENTES</button>';section.insertBefore(toolsBar,grid);const views=document.createElement('div');views.className='online-view-toggle';views.setAttribute('role','group');views.setAttribute('aria-label','Vista de juegos online');views.innerHTML='<button id="onlineViewGrid" class="active" type="button" aria-pressed="true">▦ CUADRÍCULA</button><button id="onlineViewConsole" type="button" aria-pressed="false">▤ CONSOLA</button>';toolsBar.prepend(views);const filterBar=document.createElement('div');filterBar.className='online-filters';toolsBar.after(filterBar);
const aspectSelect=player.querySelector('#onlineAspect');aspectSelect.value=localStorage.getItem('vladi_retro_aspect')||'fit';function applyAspect(){if(player.hidden)return;const top=player.querySelector('.online-top');const availableW=Math.max(1,player.clientWidth);const availableH=Math.max(1,player.clientHeight-(player.classList.contains('immersive')?0:(top?.offsetHeight||0)));const baseW=Math.min(availableW,availableH*4/3);frame.style.setProperty('width',baseW+'px','important');frame.style.setProperty('height',availableH+'px','important');frame.style.setProperty('align-self','center','important');frame.style.setProperty('transform-origin','center center','important');frame.style.setProperty('transform',aspectSelect.value==='wide'?'scaleX('+(availableW/baseW)+')':'none','important');}aspectSelect.onchange=()=>{localStorage.setItem('vladi_retro_aspect',aspectSelect.value);applyAspect()};player.querySelector('#onlineFullscreen').onclick=()=>{player.classList.add('immersive');applyAspect();if(!document.fullscreenElement)player.requestFullscreen?.().catch(()=>{})};player.querySelector('#onlineRestore').onclick=()=>{player.classList.remove('immersive');applyAspect()};window.addEventListener('resize',()=>{if(!player.hidden)applyAspect()});document.addEventListener('fullscreenchange',()=>{if(!player.hidden)requestAnimationFrame(applyAspect)});function exit(){player.classList.remove('immersive');if(document.fullscreenElement===player)document.exitFullscreen?.().catch(()=>{});try{frame.contentWindow?.EJS_emulator?.pause?.()}catch(_){}frame.srcdoc='<!doctype html><title>Cerrado</title>';player.hidden=true;document.body.style.overflow='';}
player.querySelector('#onlineExit').onclick=exit;
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!player.hidden)exit()});
async function play(game){if(!game.system){status.textContent='Esta ROM necesita selección de consola. Usá CARGAR MIS JUEGOS para abrirla manualmente.';return;}
const supported=['nes','snes','segaMD','segaMS','segaGG','gb','gbc','gba','n64'];if(!supported.includes(game.system)){status.textContent='Consola no disponible para este archivo.';return;}
const rom=base+game.path;const aspectBridge=`(function(){let mode='fit';function update(){const c=[...document.querySelectorAll('canvas')].filter(x=>x.getBoundingClientRect().width>100).sort((a,b)=>b.clientWidth*b.clientHeight-a.clientWidth*a.clientHeight)[0];if(!c)return;c.style.setProperty('transform','none','important');c.style.setProperty('transform-origin','center center','important');if(mode==='wide'){const rect=c.getBoundingClientRect();if(rect.width)c.style.setProperty('transform','scaleX('+Math.max(1,Math.min(2.5,(innerWidth-12)/rect.width))+')','important')}}addEventListener('message',e=>{if(e.source===parent&&e.data?.type==='vladi-aspect'){mode=e.data.mode;update()}});addEventListener('resize',update);setInterval(update,800)})();`;const html='<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body,#game{margin:0;width:100%;height:100%;overflow:hidden;background:#000}</style></head><body><div id="game"></div><script>window.EJS_player="#game";window.EJS_core='+JSON.stringify(game.system)+';window.EJS_gameUrl='+JSON.stringify(rom)+';window.EJS_pathtodata="https://cdn.emulatorjs.org/stable/data/";window.EJS_startOnLoaded=true;window.EJS_gameName='+JSON.stringify(game.name)+';</script><script>'+aspectBridge+'</script><script src="https://cdn.emulatorjs.org/stable/data/loader.js"></script></body></html>';
frame.srcdoc=html;frame.addEventListener('load',applyAspect,{once:true});player.querySelector('#onlinePlaying').textContent='🎮 '+game.name;player.hidden=false;document.body.style.overflow='hidden';requestAnimationFrame(applyAspect);setTimeout(applyAspect,1200);}
const favKey='vladi_retro_online_favorites_v1',recentKey='vladi_retro_online_recent_v1';
function readList(key){try{const v=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(v)?v:[]}catch{return []}}
let favorites=readList(favKey),recents=readList(recentKey);
const search=section.querySelector('#onlineSearch'),sort=section.querySelector('#onlineSort');
const gridView=section.querySelector('#onlineGridView'),favView=section.querySelector('#onlineFavView'),recentView=section.querySelector('#onlineRecentView');
let games=[],chosen='all',view='all',layout='grid',featuredPath=null;const viewGrid=section.querySelector('#onlineViewGrid'),viewConsole=section.querySelector('#onlineViewConsole');function setLayout(next){layout=next;grid.classList.toggle('console-mode',next==='console');for(const [btn,v] of [[viewGrid,'grid'],[viewConsole,'console']]){btn.classList.toggle('active',v===next);btn.setAttribute('aria-pressed',String(v===next))}try{localStorage.setItem('vladi_retro_online_layout',next)}catch{}}viewGrid.onclick=()=>setLayout('grid');viewConsole.onclick=()=>setLayout('console');setLayout(localStorage.getItem('vladi_retro_online_layout')==='console'?'console':'grid');
const cleanName=name=>name.replace(/\.[^.]+$/,'').replace(/[_]+/g,' ').replace(/\s+/g,' ').trim();

function onlineGameArtwork(game){
 const name=cleanName(game.name).toUpperCase();
 const palette=/MARIO/i.test(name)?['#ed423e','#ffbd3c']:/SONIC/i.test(name)?['#1458d8','#35d5ff']:/MORTAL/i.test(name)?['#641d28','#f0b44a']:/STREET FIGHTER/i.test(name)?['#a52d22','#f7ae32']:['#234b9e','#e4bc57'];
 const lines=name.match(/.{1,17}(?:\s|$)/g)||[name];
 const text=lines.slice(0,4).map((v,i)=>'<text x="50%" y="'+(210+i*65)+'" text-anchor="middle" font-size="'+(name.length>28?37:49)+'" font-weight="1000" fill="#fff" stroke="#10172d" stroke-width="5" paint-order="stroke">'+v.trim().replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</text>').join('');
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="520" height="700" viewBox="0 0 520 700"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="'+palette[0]+'"/><stop offset="1" stop-color="#0c1434"/></linearGradient></defs><rect width="520" height="700" fill="url(#g)"/><path d="M-60 500 L520 50 M-40 650 L600 150" stroke="'+palette[1]+'" stroke-opacity=".25" stroke-width="95"/><circle cx="260" cy="340" r="200" fill="none" stroke="'+palette[1]+'" stroke-width="9" opacity=".5"/><text x="50%" y="75" text-anchor="middle" fill="'+palette[1]+'" font-family="Arial" font-size="28" font-weight="900">VLADYERIK · RETRO</text><g font-family="Arial">'+text+'</g><text x="50%" y="630" text-anchor="middle" fill="'+palette[1]+'" font-family="Arial" font-size="25" font-weight="900">★ ARCADE COLLECTION ★</text></svg>';
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}

const thumbSystems={nes:'Nintendo - Nintendo Entertainment System',snes:'Nintendo - Super Nintendo Entertainment System',segaMD:'Sega - Mega Drive - Genesis',segaGG:'Sega - Game Gear',n64:'Nintendo - Nintendo 64'};
const coverMemory=new Map();
function coverCandidates(game){
 const system=thumbSystems[game.system];if(!system)return [];
 const raw=cleanName(game.name);
 const noTags=raw.replace(/\s*\[[^\]]*\]/g,'').replace(/\s*\([^)]*\)/g,'').replace(/\s+/g,' ').trim();
 const region=(raw.match(/\((USA|Europe|Japan|World|U|E|J)\)/i)||[])[1];
 const regionName=({U:'USA',E:'Europe',J:'Japan'})[region]||region;
 const baseNames=[raw.replace(/\s*\[[^\]]*\]/g,'').trim(),noTags+' (USA)',noTags+' (Europe)',noTags+' (World)',noTags];
 if(regionName)baseNames.splice(1,0,noTags+' ('+regionName+')');
 const alt=noTags.match(/^(.+), The$/i);if(alt)baseNames.push('The '+alt[1]+' (USA)');
 const aliases={'1200-in-1':['Super Mario Bros','Super Mario Bros. 3'],'72-in-1':['Super Mario Bros','Contra'],'diddy kong racing':['Diddy Kong Racing'],'donkey kong country 2':['Donkey Kong Country 2 - Diddy’s Kong Quest'],'donkey kong country 3':['Donkey Kong Country 3 - Dixie Kong’s Double Trouble'],'super mario bros 3':['Super Mario Bros. 3'],'cruis\'n usa':["Cruis'n USA"]};const key=noTags.toLowerCase();const related=Object.entries(aliases).find(([k])=>key.includes(k));if(related)baseNames.push(...related[1].flatMap(x=>[x+' (USA)',x+' (Europe)',x]));if(noTags.includes(' - '))baseNames.push(noTags.split(' - ')[0]+' (USA)');const names=[...new Set(baseNames.filter(Boolean))].slice(0,18);
 const prefix='https://thumbnails.libretro.com/'+encodeURIComponent(system)+'/';
 const urls=[];
 for(const type of ['Named_Boxarts','Named_Titles','Named_Snaps']){
  for(const name of names){
   const safe=name.replace(/[&*\/:<>?|"\\]/g,'_');
   urls.push(prefix+type+'/'+encodeURIComponent(safe)+'.png');
  }
 }
 return urls;
}
function setArtwork(target,game,{priority=false}={}){
 target.replaceChildren();
 const fallback=document.createElement('span');fallback.className='online-fallback';fallback.textContent=({nes:'🎮',snes:'🎮',segaMD:'🕹️',segaGG:'🎮',n64:'🎮'})[game.system]||'🎮';target.append(fallback);
 const fallbackImage=document.createElement('img');fallbackImage.alt='Carátula VLADYERIK de '+cleanName(game.name);fallbackImage.src=onlineGameArtwork(game);fallback.replaceWith(fallbackImage);const urls=coverCandidates(game);if(!urls.length)return;
 const cached=coverMemory.get(game.system+'|'+cleanName(game.name));
 if(cached===false)return;
 const candidates=typeof cached==='string'?[cached]:urls;
 let idx=0;
 const img=document.createElement('img');img.alt='Portada de '+cleanName(game.name);img.decoding='async';img.loading=priority?'eager':'lazy';
 img.onload=()=>{coverMemory.set(game.system+'|'+cleanName(game.name),img.src);fallbackImage.remove();if(!img.isConnected)target.append(img)};
 img.onerror=()=>{if(idx<candidates.length){img.src=candidates[idx++]}else{coverMemory.set(game.system+'|'+cleanName(game.name),false);img.remove()}};
 // Carga diferida real: evita disparar decenas de solicitudes para juegos fuera de pantalla.
 const start=()=>{if(!target.isConnected)return;target.append(img);img.src=candidates[idx++]};
 if(priority||!('IntersectionObserver' in window)){start()}else{
  const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){io.disconnect();start()}},{rootMargin:'260px'});
  io.observe(target);
 }
}
function featureGame(game){if(!game)return;featuredPath=game.path;setArtwork(section.querySelector('#onlineFeatureArt'),game,{priority:true});section.querySelector('#onlineFeatureName').textContent=cleanName(game.name);section.querySelector('#onlineFeatureSystem').textContent='🌟 DESTACADO · '+(game.system||'RETRO').toUpperCase();section.querySelector('#onlineFeatureHint').textContent='Jugá directamente en RETRO ONLINE';const b=section.querySelector('#onlineFeatureFav');b.textContent=favorites.includes(game.path)?'★ FAVORITO':'☆ FAVORITO'}function launchGame(game){recents=[game.path,...recents.filter(x=>x!==game.path)].slice(0,30);localStorage.setItem(recentKey,JSON.stringify(recents));featureGame(game);play(game)}section.querySelector('#onlineFeaturePlay').onclick=()=>{const g=games.find(x=>x.path===featuredPath);if(g)launchGame(g)};section.querySelector('#onlineFeatureFav').onclick=()=>{const g=games.find(x=>x.path===featuredPath);if(!g)return;favorites=favorites.includes(g.path)?favorites.filter(x=>x!==g.path):[g.path,...favorites];localStorage.setItem(favKey,JSON.stringify(favorites));featureGame(g);showGames()};section.querySelector('#onlineFeatureNext').onclick=()=>{if(!games.length)return;const idx=games.findIndex(x=>x.path===featuredPath);featureGame(games[(idx+1)%games.length])};function showGames(){
 const q=search.value.trim().toLocaleLowerCase();
 let filtered=games.filter(g=>(chosen==='all'||g.system===chosen)&&(!q||(cleanName(g.name)+' '+(g.system||'')).toLocaleLowerCase().includes(q))&&(view==='all'||(view==='favorites'?favorites.includes(g.path):recents.includes(g.path))));
 if(view==='recent')filtered.sort((a,b)=>recents.indexOf(a.path)-recents.indexOf(b.path));
 else filtered.sort((a,b)=>sort.value==='size'?(Number(b.size)||0)-(Number(a.size)||0):sort.value==='console'?(a.system||'').localeCompare(b.system||'')||cleanName(a.name).localeCompare(cleanName(b.name)):sort.value==='za'?cleanName(b.name).localeCompare(cleanName(a.name)):cleanName(a.name).localeCompare(cleanName(b.name)));
 grid.replaceChildren();
 for(const game of filtered){
  const card=document.createElement('div');card.className='online-card';card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label','Jugar '+cleanName(game.name));
  const art=document.createElement('div');art.className='online-art';setArtwork(art,game);
  const info=document.createElement('div');info.className='online-info';
  const title=document.createElement('strong');title.textContent=cleanName(game.name);
  const meta=document.createElement('small');meta.textContent=(game.system||'SIN IDENTIFICAR').toUpperCase();
  const fav=document.createElement('button');fav.className='online-fav';fav.type='button';fav.textContent=favorites.includes(game.path)?'★':'☆';fav.setAttribute('aria-label','Agregar o quitar favorito');fav.setAttribute('aria-pressed',String(favorites.includes(game.path)));
  fav.onclick=e=>{e.stopPropagation();favorites=favorites.includes(game.path)?favorites.filter(x=>x!==game.path):[game.path,...favorites];localStorage.setItem(favKey,JSON.stringify(favorites));showGames()};
  card.onclick=()=>launchGame(game);
  card.onkeydown=e=>{if(e.target===card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();card.click()}};
  info.append(title,meta);card.append(art,info,fav);grid.append(card);
 }
 status.textContent=games.length+' juegos online disponibles · '+filtered.length+' mostrados';
 if(!filtered.length){const empty=document.createElement('p');empty.className='online-empty';empty.textContent='No hay juegos para estos filtros.';grid.append(empty)}
}
function setView(next){view=next;for(const [el,v] of [[gridView,'all'],[favView,'favorites'],[recentView,'recent']])el.classList.toggle('active',v===view);showGames()}
gridView.onclick=()=>setView('all');favView.onclick=()=>setView('favorites');recentView.onclick=()=>setView('recent');
search.addEventListener('input',showGames);sort.addEventListener('change',showGames);
fetch(base+'juegos.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Catálogo no disponible');return r.json()}).then(data=>{
 games=(Array.isArray(data.games)?data.games:[]).filter(g=>g.name&&g.path&&g.path.startsWith('roms/')&&!g.path.includes('..'));
 const systems=[...new Set(games.map(g=>g.system).filter(Boolean))];
 for(const sys of ['all',...systems]){const b=document.createElement('button');b.type='button';b.textContent=sys==='all'?'TODOS':sys.toUpperCase();b.className=sys==='all'?'active':'';b.onclick=()=>{chosen=sys;for(const btn of filterBar.children)btn.classList.toggle('active',btn===b);showGames()};filterBar.append(b)}
 featureGame(games.find(g=>g.path===featuredPath)||games[0]);showGames();
}).catch(()=>{status.textContent='El catálogo online no está disponible. La colección local sigue funcionando.'});

/* Navegación por joystick en RETRO ONLINE; la biblioteca local conserva su propio controlador. */
const padStyle=document.createElement('style');padStyle.textContent='#retroOnline .online-pad-focus{outline:3px solid #ffcf42!important;outline-offset:3px!important;box-shadow:0 0 0 5px #0c204b,0 0 24px #ffcd6488!important}';document.head.append(padStyle);
let padFocus=null,padLast=0,padConfirm=false,padBack=false;
function padTargets(){return [...section.querySelectorAll('button,input,select,[role="button"]')].filter(el=>el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden'&&!el.disabled)}
function padSetFocus(el){if(!el)return;padFocus?.classList.remove('online-pad-focus');padFocus=el;el.classList.add('online-pad-focus');el.focus({preventScroll:true});el.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'});window.__vladiOnlinePadActive=true}
function padMove(dx,dy){const targets=padTargets();if(!targets.length)return;if(!padFocus||!targets.includes(padFocus)){padSetFocus(targets[0]);return}const r=padFocus.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;let best=null,score=Infinity;for(const el of targets){if(el===padFocus)continue;const a=el.getBoundingClientRect(),x=a.left+a.width/2-cx,y=a.top+a.height/2-cy;const primary=dx?x*dx:y*dy,secondary=dx?Math.abs(y):Math.abs(x);if(primary<8)continue;const value=primary+secondary*2.4;if(value<score){score=value;best=el}}if(best)padSetFocus(best)}
function onlinePadLoop(now){
 const pads=[...(navigator.getGamepads?.()||[])].filter(Boolean);
 if(!player.hidden){window.__vladiOnlinePadActive=false;padFocus?.classList.remove('online-pad-focus');padFocus=null;requestAnimationFrame(onlinePadLoop);return}
 if(pads.length&&(window.__vladiOnlinePadActive||section.contains(document.activeElement)||!document.activeElement||document.activeElement===document.body)){
  const pressed=i=>pads.some(p=>p.buttons?.[i]?.pressed);
  const axis=i=>pads.find(p=>Math.abs(p.axes?.[i]||0)>.6)?.axes[i]||0;
  const dx=pressed(15)||axis(0)>.6?1:pressed(14)||axis(0)<-.6?-1:0;
  const dy=pressed(13)||axis(1)>.6?1:pressed(12)||axis(1)<-.6?-1:0;
  if((dx||dy)&&now-padLast>210){padMove(dx,dy);padLast=now}
  const confirm=[0,1,2,3,9].some(pressed);
  if(confirm&&!padConfirm){if(!padFocus)padSetFocus(padTargets()[0]);else if(padFocus.tagName==='SELECT'){padFocus.focus();padFocus.showPicker?.()}else if(padFocus.tagName==='INPUT')padFocus.focus();else padFocus.click()}
  padConfirm=confirm;
  const back=pressed(8);
  if(back&&!padBack){padFocus?.classList.remove('online-pad-focus');padFocus=null;window.__vladiOnlinePadActive=false}
  padBack=back;
 }else{padConfirm=false;padBack=false}
 requestAnimationFrame(onlinePadLoop);
}
section.addEventListener('focusin',()=>{window.__vladiOnlinePadActive=true});document.addEventListener('focusin',e=>{if(!section.contains(e.target)&&player.hidden){window.__vladiOnlinePadActive=false;padFocus?.classList.remove('online-pad-focus');padFocus=null}});
requestAnimationFrame(onlinePadLoop);
})();
