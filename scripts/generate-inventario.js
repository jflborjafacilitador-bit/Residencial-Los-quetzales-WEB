const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const inventarioDir = 'c:/Users/Dynabook/OneDrive/Escritorio/Quetzalez/Aplicaciones/Registro web/public/Inventario';
const outputPath = 'c:/Users/Dynabook/OneDrive/Escritorio/Quetzalez/Aplicaciones/Pagina web/site/public/inventario.js';

// Buscar dinámicamente el archivo Excel más reciente
const files = fs.readdirSync(inventarioDir);
const excelFiles = files.filter(f => f.endsWith('.xlsx') && !f.startsWith('~$'));

if (excelFiles.length === 0) {
    throw new Error('No se encontraron archivos Excel en: ' + inventarioDir);
}

let latestFile = excelFiles[0];
let latestMtime = fs.statSync(path.join(inventarioDir, latestFile)).mtimeMs;

for (let i = 1; i < excelFiles.length; i++) {
    const file = excelFiles[i];
    const mtime = fs.statSync(path.join(inventarioDir, file)).mtimeMs;
    if (mtime > latestMtime) {
        latestFile = file;
        latestMtime = mtime;
    }
}

const excelPath = path.join(inventarioDir, latestFile);
console.log('Archivo Excel detectado para la sincronización:', latestFile);

const workbook = xlsx.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

const items = rows
    .filter(row => {
        const mza = String(row[1] || '').trim();
        const cond = String(row[3] || '').trim().toUpperCase();
        return (
            mza !== '' &&
            !isNaN(Number(mza)) &&
            (cond.includes('TUCAN') || cond.includes('AVE') || cond.includes('PARAISO'))
        );
    })
    .map(row => ({
        mza: Number(String(row[1] || '').trim()),
        casa: Number(String(row[2] || '').trim()),
        privada: String(row[3] || '').trim().toUpperCase(),
        prototipo: String(row[4] || '').trim(),
        m2Const: String(row[7] || '').trim(),
        m2Terreno: String(row[8] || '').trim(),
        esquema: String(row[12] || '').trim(),
        estatus: (() => {
            const raw = String(row[13] || '').trim().toUpperCase();
            // Normalizar al formato que usa la página web
            if (raw === 'DISPONIBLE' || raw === 'DUSPONIBLE' || raw === 'DISPOINBLE' || raw === 'DISPONBLE') return 'disponible';
            if (raw === 'VENDIDA' || raw === 'VENDIDO') return 'no-disponible';
            if (raw === 'EN_PROCESO' || raw === 'EN PROCESO' || raw === 'APARTADA') return 'en-proceso';
            if (raw === 'NO DISPONIBLE' || raw === 'NO-DISPONIBLE') return 'no-disponible';
            return 'disponible'; // fallback seguro
        })(),
        entrega: String(row[14] || '').trim() || "INMEDIATA"
    }));

let jsContent = `// Inventario Residencial Los Quetzales
// Autogenerado desde el Excel de Registro Web (${latestFile})

const INVENTARIO = [\n`;

items.forEach(item => {
    jsContent += `  { mza: ${item.mza}, casa: ${item.casa}, privada: "${item.privada}", prototipo: "${item.prototipo}", m2Const: "${item.m2Const}", m2Terreno: "${item.m2Terreno}", esquema: "${item.esquema}", estatus: "${item.estatus}", entrega: "${item.entrega}" },\n`;
});

jsContent += `];

// Estadísticas por manzana
function getStats(mza) {
  const f = mza ? INVENTARIO.filter(e => e.mza === mza) : INVENTARIO;
  return {
    total: f.length,
    disponibles: f.filter(e => e.estatus === "disponible").length,
    noDisponibles: f.filter(e => e.estatus === "no-disponible" || e.estatus === "VENDIDA" || e.estatus === "EN_PROCESO").length,
  };
}
`;

fs.writeFileSync(outputPath, jsContent);
console.log('Inventario generado exitosamente. Total de casas: ' + items.length);
