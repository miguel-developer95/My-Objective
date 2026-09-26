@echo off
title Proyecto de Vida - Libertad Financiera
echo ========================================================
echo   Iniciando Maqueta 3D: LIBERTAD FINANCIERA
echo ========================================================
echo.

:: Iniciar servidor local Python en segundo plano
start /B python -m http.server 3000 >nul 2>&1
timeout /t 1 /nobreak >nul

:: Abrir en el navegador predeterminado
echo Abriendo en tu navegador: http://localhost:3000 ...
start http://localhost:3000

echo.
echo ========================================================
echo  Maqueta iniciada con exito en: http://localhost:3000
echo ========================================================
echo  (Presiona cualquier tecla para detener el servidor)
pause >nul
taskkill /F /IM python.exe >nul 2>&1
exit
