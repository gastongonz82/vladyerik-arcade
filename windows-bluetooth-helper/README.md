# VLADYERIK ROCKOLA — Bluetooth en Windows 11

Esta primera versión del controlador **no recibe audio por sí misma**. Aprovecha la app **Bluetooth Audio Receiver**, que debe estar instalada y funcionando. Permite que la pantalla Bluetooth de Rockola abra el receptor y la configuración de Bluetooth de Windows.

## Instalación y prueba

1. Instalá Python 3 para Windows desde https://www.python.org/downloads/windows/ si no lo tenés (marcá *Add Python to PATH*).
2. Descargá juntos los archivos `rockola_bluetooth.py` e `iniciar-bluetooth.bat` de esta carpeta.
3. Hacé doble clic en `iniciar-bluetooth.bat` y dejá abierta la ventana.
4. En **la misma notebook**, abrí https://arcade.vladyerik.com/rockola.html y tocá **Bluetooth celular**.
5. La pantalla debe indicar **Controlador disponible**. Tocá **Abrir receptor Bluetooth** y conectá el teléfono desde la aplicación.
6. Reproducí audio en el celular. Debe salir por los parlantes de la notebook, como en la prueba anterior.

Si el navegador bloquea solicitudes locales, revisá los permisos de acceso a red local para ese sitio. Si no detecta la app, abrila manualmente y continuá usando la pantalla Bluetooth.

## Limitaciones

- El controlador escucha **solo en 127.0.0.1:8765**; no expone servicios a la red.
- Solo acepta órdenes desde el origen HTTPS de Rockola; no ejecuta comandos arbitrarios.
- No controla directamente la conexión A2DP ni obtiene canción/artista del teléfono.
- La animación es decorativa, no representa el audio Bluetooth real.
- La página de Rockola sigue funcionando sin este controlador; el reproductor MP3 es independiente.
- Este prototipo necesita pruebas reales en Windows 11 antes de considerarlo listo para una máquina arcade.
