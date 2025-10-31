@echo off
set PORT=8080
echo Tentando npx http-server na porta %PORT%...
npx http-server . -p %PORT% -o
if "%ERRORLEVEL%"=="0" goto :eof
echo http-server falhou ou nao foi encontrado, tentando npx serve...
npx serve -s . -l %PORT%
if "%ERRORLEVEL%"=="0" goto :eof
echo npx serve falhou ou nao foi encontrado, tentando Python...
py -m http.server %PORT%
if "%ERRORLEVEL%"=="0" goto :eof
echo Erro: nao foi possivel iniciar servidor. Instale Node.js (npx) ou Python.
pause