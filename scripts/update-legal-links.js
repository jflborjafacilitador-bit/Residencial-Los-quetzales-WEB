const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'site', 'public');
const files = [
  'index.html',
  'ave-de-paraiso.html',
  'catalogo-quetzal-plus.html',
  'catalogo-quetzal.html',
  'contacto.html',
  'propiedades.html',
  'tucan.html'
];

const newFooterBottom = `  <div class="footer-bottom">
    <p>© 2026 Residencial Los Quetzales · Todos los derechos reservados</p>
    <div class="footer-bottom-links">
      <a href="privacidad.html">Aviso de Privacidad</a>
      <span>·</span>
      <a href="terminos.html">Términos y Condiciones</a>
    </div>
  </div>`;

files.forEach(fileName => {
  const filePath = path.join(publicDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace old footer-bottom
  const pattern = /<div class="footer-bottom">[\s\S]*?<\/div>/;
  if (pattern.test(content)) {
    content = content.replace(pattern, newFooterBottom);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated footer in: ${fileName}`);
  } else {
    console.warn(`Pattern not found in: ${fileName}`);
  }
});

// Also update calculadora.html
const calcPath = path.join(publicDir, 'calculadora.html');
if (fs.existsSync(calcPath)) {
  let calcContent = fs.readFileSync(calcPath, 'utf8');
  const calcFooterOld = /<p>© 2026 Residencial Los Quetzales · <a href="index.html" style="color:#8DC63F;">Inicio<\/a><\/p>/;
  const calcFooterNew = `<p>© 2026 Residencial Los Quetzales · <a href="index.html" style="color:#8DC63F;">Inicio</a></p>
  <div style="margin-top:10px;display:flex;justify-content:center;gap:16px;flex-wrap:wrap;font-size:13px;">
    <a href="privacidad.html" style="color:#888;text-decoration:none;">Aviso de Privacidad</a>
    <span style="color:#555;">·</span>
    <a href="terminos.html" style="color:#888;text-decoration:none;">Términos y Condiciones</a>
  </div>`;
  if (calcFooterOld.test(calcContent)) {
    calcContent = calcContent.replace(calcFooterOld, calcFooterNew);
    fs.writeFileSync(calcPath, calcContent, 'utf8');
    console.log('Updated footer in: calculadora.html');
  }
}

console.log('Done updating all footers.');
