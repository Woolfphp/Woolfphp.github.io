# start.ps1 - inicia servidor estático para desenvolvimento local
# Uso: ./start.ps1 [porta]
param(
  [int]$Port = 8080
)

Write-Host "Tentando iniciar com npx http-server na porta $Port..."
try {
  & npx http-server . -p $Port -o
  exit 0
} catch {
  Write-Warning "http-server não disponível via npx ou falhou. Tentando 'serve'..."
  try {
    & npx serve -s . -l $Port
    exit 0
  } catch {
    Write-Warning "npx serve não disponível. Tentando Python http.server..."
    try {
      & py -m http.server $Port
      exit 0
    } catch {
      Write-Error "Não foi possível iniciar um servidor local. Instale Node.js (npx) ou Python."
      exit 1
    }
  }
}