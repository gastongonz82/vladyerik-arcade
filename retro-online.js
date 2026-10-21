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
`;document.head.append(style);
const section=document.createElement('section');section.id='retroOnline';section.innerHTML='<h2>🌐 RETRO ONLINE</h2><p class="hint">Juegos disponibles para jugar directamente, sin subir archivos.</p><div id="onlineStatus" role="status">Cargando catálogo…</div><div class="online-grid" id="onlineGrid"></div>';
const nav=document.querySelector('.tabs');nav?.before(section);
const collection=document.querySelector('#collection .collection-title h2');if(collection)collection.textContent='📂 CARGAR MIS JUEGOS · COLECCIÓN LOCAL';
const player=document.createElement('div');player.id='onlinePlayer';player.hidden=true;player.innerHTML='<div class="online-top"><strong id="onlinePlaying">🎮 RETRO ONLINE</strong><div class="online-actions"><label>▣ IMAGEN <select id="onlineAspect"><option value="fit">AJUSTAR</option><option value="original">ORIGINAL 4:3</option><option value="wide">WIDESCREEN 16:9</option></select></label><button id="onlineFullscreen" type="button">⛶ PANTALLA COMPLETA</button><button id="onlineExit" type="button">✕ SALIR</button></div></div><button id="onlineRestore" type="button">⚙ MOSTRAR CONTROLES</button><iframe title="Emulador retro online" allow="fullscreen; gamepad" allowfullscreen></iframe>';document.body.append(player);
const status=section.querySelector('#onlineStatus'),grid=section.querySelector('#onlineGrid'),frame=player.querySelector('iframe');
const toolsBar=document.createElement('div');toolsBar.className='online-tools';toolsBar.innerHTML='<input id="onlineSearch" type="search" placeholder="⌕ Buscar juegos online…" aria-label="Buscar juegos online"><select id="onlineSort" aria-label="Ordenar juegos"><option value="az">Nombre A → Z</option><option value="za">Nombre Z → A</option><option value="console">Por consola</option><option value="size">Tamaño mayor a menor</option></select><button id="onlineGridView" type="button" class="active">▦ TODOS</button><button id="onlineFavView" type="button">★ FAVORITOS</button><button id="onlineRecentView" type="button">◷ RECIENTES</button>';section.insertBefore(toolsBar,grid);const filterBar=document.createElement('div');filterBar.className='online-filters';toolsBar.after(filterBar);
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
let games=[],chosen='all',view='all';
const cleanName=name=>name.replace(/\.[^.]+$/,'').replace(/[_]+/g,' ').replace(/\s+/g,' ').trim();
function showGames(){
 const q=search.value.trim().toLocaleLowerCase();
 let filtered=games.filter(g=>(chosen==='all'||g.system===chosen)&&(!q||(cleanName(g.name)+' '+(g.system||'')).toLocaleLowerCase().includes(q))&&(view==='all'||(view==='favorites'?favorites.includes(g.path):recents.includes(g.path))));
 if(view==='recent')filtered.sort((a,b)=>recents.indexOf(a.path)-recents.indexOf(b.path));
 else filtered.sort((a,b)=>sort.value==='size'?(Number(b.size)||0)-(Number(a.size)||0):sort.value==='console'?(a.system||'').localeCompare(b.system||'')||cleanName(a.name).localeCompare(cleanName(b.name)):sort.value==='za'?cleanName(b.name).localeCompare(cleanName(a.name)):cleanName(a.name).localeCompare(cleanName(b.name)));
 grid.replaceChildren();
 for(const game of filtered){
  const card=document.createElement('div');card.className='online-card';card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label','Jugar '+cleanName(game.name));
  const art=document.createElement('div');art.className='online-art';art.textContent='🎮';
  const info=document.createElement('div');info.className='online-info';
  const title=document.createElement('strong');title.textContent=cleanName(game.name);
  const meta=document.createElement('small');meta.textContent=(game.system||'SIN IDENTIFICAR').toUpperCase();
  const fav=document.createElement('button');fav.className='online-fav';fav.type='button';fav.textContent=favorites.includes(game.path)?'★':'☆';fav.setAttribute('aria-label','Agregar o quitar favorito');fav.setAttribute('aria-pressed',String(favorites.includes(game.path)));
  fav.onclick=e=>{e.stopPropagation();favorites=favorites.includes(game.path)?favorites.filter(x=>x!==game.path):[game.path,...favorites];localStorage.setItem(favKey,JSON.stringify(favorites));showGames()};
  card.onclick=()=>{recents=[game.path,...recents.filter(x=>x!==game.path)].slice(0,30);localStorage.setItem(recentKey,JSON.stringify(recents));play(game)};
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
 showGames();
}).catch(()=>{status.textContent='El catálogo online no está disponible. La colección local sigue funcionando.'});
})();
