@echo off
title Scroll Tied Video Section - Libertad Financiera
echo ========================================================
echo   Iniciando experiencia cinematografica...
echo ========================================================
echo.

start /B npm run dev >nul 2>&1
timeout /t 2 /nobreak >nul

echo Abriendo en el navegador: http://localhost:3000 ...
start http://localhost:3000

echo.
echo ========================================================
echo  Proyecto corriendo con exito en: http://localhost:3000
echo ========================================================
echo  (Presiona cualquier tecla para cerrar esta ventana)
pause >nul
exit
