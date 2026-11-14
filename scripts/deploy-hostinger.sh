#!/bin/bash
set -e

echo "=== Despliegue automático a Hostinger ==="

TARGET_HOST="${FTP_SERVER:-$HOSTINGER_HOST}"

if [ -z "$TARGET_HOST" ] || [ -z "$HOSTINGER_USER" ] || [ -z "$HOSTINGER_PASS" ]; then
  echo "Error: Faltan variables de entorno para el despliegue."
  exit 1
fi

echo "Conectando por FTP a $TARGET_HOST con usuario $HOSTINGER_USER..."

# Determinar la ruta exacta del dominio residenciallosquetzales.com
TARGET_DIR="."

echo "Comprobando rutas remotas..."
if lftp -u "$HOSTINGER_USER","$HOSTINGER_PASS" ftp://$TARGET_HOST -e "set ssl:verify-certificate no; set ftp:ssl-allow yes; cd ../domains/residenciallosquetzales.com/public_html; bye" 2>/dev/null; then
  TARGET_DIR="../domains/residenciallosquetzales.com/public_html"
elif lftp -u "$HOSTINGER_USER","$HOSTINGER_PASS" ftp://$TARGET_HOST -e "set ssl:verify-certificate no; set ftp:ssl-allow yes; cd domains/residenciallosquetzales.com/public_html; bye" 2>/dev/null; then
  TARGET_DIR="domains/residenciallosquetzales.com/public_html"
elif lftp -u "$HOSTINGER_USER","$HOSTINGER_PASS" ftp://$TARGET_HOST -e "set ssl:verify-certificate no; set ftp:ssl-allow yes; cd public_html; bye" 2>/dev/null; then
  TARGET_DIR="public_html"
fi

echo "Directorio destino seleccionado: $TARGET_DIR"

echo "=== Subiendo archivos a $TARGET_DIR ==="
lftp -u "$HOSTINGER_USER","$HOSTINGER_PASS" ftp://$TARGET_HOST << EOF_FTP
set ssl:verify-certificate no
set ftp:ssl-allow yes
set ftp:passive-mode on
set net:timeout 60
set net:max-retries 3
cd "$TARGET_DIR"
pwd
mirror --reverse --parallel=6 --transfer-all --overwrite --verbose site/public/ .
bye
EOF_FTP

echo "✅ Despliegue completado con éxito a $TARGET_DIR"
