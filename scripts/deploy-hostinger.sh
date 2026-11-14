#!/bin/bash
set -e

echo "=== Despliegue automático a Hostinger ==="

# 1. Preparar credenciales y servidor
TARGET_HOST="${FTP_SERVER:-$HOSTINGER_HOST}"

if [ -z "$TARGET_HOST" ] || [ -z "$HOSTINGER_USER" ] || [ -z "$HOSTINGER_PASS" ]; then
  echo "Error: Faltan variables de entorno para el despliegue."
  exit 1
fi

echo "Conectando por FTP a $TARGET_HOST con usuario $HOSTINGER_USER..."

# Detectar directorios remotos
REMOTE_DIRS=$(lftp -u "$HOSTINGER_USER","$HOSTINGER_PASS" ftp://$TARGET_HOST -e "set ssl:verify-certificate no; set ftp:ssl-allow yes; set ftp:passive-mode on; set net:timeout 30; cls -1; bye" 2>&1 || true)

echo "Directorios remotos encontrados:"
echo "$REMOTE_DIRS"

REMOTE_TARGET="."
if echo "$REMOTE_DIRS" | grep -q "^domains$"; then
  REMOTE_TARGET="domains/residenciallosquetzales.com/public_html"
elif echo "$REMOTE_DIRS" | grep -q "^public_html$"; then
  REMOTE_TARGET="public_html"
fi

echo "Directorio remoto seleccionado: $REMOTE_TARGET"

echo "=== Subiendo archivos de site/public/ vía FTP ==="
if lftp -u "$HOSTINGER_USER","$HOSTINGER_PASS" ftp://$TARGET_HOST << EOF_FTP
set ssl:verify-certificate no
set ftp:ssl-allow yes
set ftp:passive-mode on
set net:timeout 60
set net:max-retries 3
cd "$REMOTE_TARGET"
pwd
mirror --reverse --parallel=6 --transfer-all --overwrite --verbose site/public/ .
bye
EOF_FTP
then
  echo "✅ Despliegue vía FTP completado con éxito a $TARGET_HOST"
  exit 0
fi

echo "⚠️ FTP no tuvo éxito. Intentando respaldo vía SFTP..."
PORT="${HOSTINGER_PORT:-22}"
echo "Conectando por SFTP a $HOSTINGER_HOST:$PORT..."
if lftp -u "$HOSTINGER_USER","$HOSTINGER_PASS" sftp://$HOSTINGER_HOST:$PORT << EOF_SFTP
set sftp:auto-confirm yes
set net:timeout 60
set net:max-retries 3
cd domains/residenciallosquetzales.com/public_html || cd public_html || cd .
pwd
mirror --reverse --parallel=6 --transfer-all --overwrite --verbose site/public/ .
bye
EOF_SFTP
then
  echo "✅ Despliegue vía SFTP completado con éxito"
  exit 0
fi

echo "❌ Error: Fallaron los métodos de despliegue."
exit 1
