@echo off
chcp 65001 >nul
echo Telechargement des icones des competences...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0telecharger-icones.ps1"
pause
