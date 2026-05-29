# Script para sincronizar el inventario de la Página Web con el Registro Web automáticamente
# Uso: .\sincronizar.ps1

Write-Host "1. Ejecutando el generador de inventario..." -ForegroundColor Cyan
node scripts/generate-inventario.js

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al generar el inventario. Abortando." -ForegroundColor Red
    exit 1
}

Write-Host "2. Preparando cambios para Git..." -ForegroundColor Cyan
git add site/public/inventario.js scripts/generate-inventario.js

Write-Host "3. Creando commit..." -ForegroundColor Cyan
$fecha = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Sincronizacion automatica de inventario ($fecha)"

Write-Host "4. Subiendo cambios a GitHub para despliegue..." -ForegroundColor Cyan
git push origin master

if ($LASTEXITCODE -eq 0) {
    Write-Host "¡Sincronización y push completados con éxito! El despliegue automático a Hostinger comenzará en unos momentos." -ForegroundColor Green
} else {
    Write-Host "Error al subir los cambios a GitHub." -ForegroundColor Red
}
