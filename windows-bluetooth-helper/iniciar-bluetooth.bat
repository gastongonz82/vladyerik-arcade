@echo off
title VLADYERIK ROCKOLA - Bluetooth Windows
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 rockola_bluetooth.py
) else (
  python rockola_bluetooth.py
)
if errorlevel 1 (
  echo.
  echo No se pudo iniciar. Instala Python 3 desde python.org y activa Add Python to PATH.
  pause
)
