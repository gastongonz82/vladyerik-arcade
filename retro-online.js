/* VLADYERIK RETRO ONLINE: módulo independiente de la biblioteca local. */
(()=>{'use strict';
const host=document.querySelector('main');if(!host)return;
const base='https://gastongonz82.github.io/vladyerik-retro-games/';
const style=document.createElement('style');style.textContent=`
#retroOnline{margin:24px 0 30px;padding:20px;border:1px solid #557fc1;border-radius:20px;background:linear-gradient(115deg,#152d5b,#15152f)}
#retroOnline h2{margin:0 0 8px;color:#ffe078}#retroOnline .online-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:12px;margin-top:16px}
#retroOnline .online-card{padding:17px;text-align:left;min-height:125px;background:#152c54;border:1px solid #5278b4;border-radius:14px;color:white}
#retroOnline .online-card strong{display:block;margin:10px 0;font-size:15px}#retroOnline .online-card small{color:#b5eaff}
#onlinePlayer{position:fixed;inset:0;z-index:10010;background:#050916;display:flex;flex-direction:column}
#onlinePlayer[hidden]{display:none}#onlinePlayer .online-top{padding:10px;display:flex;justify-content:space-between;gap:10px;align-items:center;background:#152448}
#onlinePlayer iframe{border:0;flex:1;width:100%;min-height:0;background:#000}
#onlinePlayer button{background:#ffd15c;color:#101830;font-weight:900}
`;document.head.append(style);
const section=document.createElement('section');section.id='retroOnline';section.innerHTML='<h2>🌐 RETRO ONLINE</h2><p class="hint">Juegos disponibles para jugar directamente, sin subir archivos.</p><div id="onlineStatus" role="status">Cargando catálogo…</div><div class="online-grid" id="onlineGrid"></div>';
const nav=document.querySelector('.tabs');nav?.before(section);
const collection=document.querySelector('#collection .collection-title h2');if(collection)collection.textContent='📂 CARGAR MIS JUEGOS · COLECCIÓN LOCAL';
const player=document.createElement('div');player.id='onlinePlayer';player.hidden=true;player.innerHTML='<div class="online-top"><strong id="onlinePlaying">🎮 RETRO ONLINE</strong><button id="onlineExit" type="button">✕ SALIR</button></div><iframe title="Emulador retro online" allow="fullscreen; gamepad" allowfullscreen></iframe>';document.body.append(player);
const status=section.querySelector('#onlineStatus'),grid=section.querySelector('#onlineGrid'),frame=player.querySelector('iframe');
function exit(){frame.srcdoc='<!doctype html><title>Cerrado</title>';player.hidden=true;document.body.style.overflow='';}
player.querySelector('#onlineExit').onclick=exit;
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!player.hidden)exit()});
async function play(game){if(!game.system){status.textContent='Esta ROM necesita selección de consola. Usá CARGAR MIS JUEGOS para abrirla manualmente.';return;}
const supported=['nes','snes','segaMD','segaMS','segaGG','gb','gbc','gba','n64'];if(!supported.includes(game.system)){status.textContent='Consola no disponible para este archivo.';return;}
const rom=base+game.path;const html='<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body,#game{margin:0;width:100%;height:100%;overflow:hidden;background:#000}</style></head><body><div id="game"></div><script>window.EJS_player="#game";window.EJS_core='+JSON.stringify(game.system)+';window.EJS_gameUrl='+JSON.stringify(rom)+';window.EJS_pathtodata="https://cdn.emulatorjs.org/stable/data/";window.EJS_startOnLoaded=true;window.EJS_gameName='+JSON.stringify(game.name)+';<\\/script><script src="https://cdn.emulatorjs.org/stable/data/loader.js"><\\/script></body></html>';
frame.srcdoc=html;player.querySelector('#onlinePlaying').textContent='🎮 '+game.name;player.hidden=false;document.body.style.overflow='hidden';}
fetch(base+'juegos.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Catálogo no disponible');return r.json()}).then(data=>{const games=Array.isArray(data.games)?data.games:[];status.textContent=games.length?games.length+' juegos online disponibles':'Todavía no hay juegos online. Podés seguir usando tu colección local.';for(const game of games){if(!game.name||!game.path||!/^roms\/[\w.%()-]+$/i.test(game.path))continue;const btn=document.createElement('button');btn.className='online-card';btn.type='button';const icon=document.createElement('div');icon.textContent='🎮';icon.style.fontSize='32px';const title=document.createElement('strong');title.textContent=game.name.replace(/\.[^.]+$/,'').replace(/[_-]+/g,' ');const meta=document.createElement('small');meta.textContent=(game.system||'Consola por identificar').toUpperCase();btn.append(icon,title,meta);btn.onclick=()=>play(game);grid.append(btn);}}).catch(()=>{status.textContent='El catálogo online todavía no está publicado. La colección local sigue disponible.'});
})();
