const fs = require('fs');
const src = fs.readFileSync('manzana-2.html', 'utf8');

// Build manzana-3 by replacing the model cards section entirely
const m3 = src
  .replace('manzana-2.html" class="active"', 'manzana-2.html"')
  .replace('href="manzana-3.html">', 'href="manzana-3.html" class="active">')
  .replace('<title>Manzana 2', '<title>Manzana 3')
  .replace('content="Manzana 2:', 'content="Manzana 3:')
  .replace('Manzana 3 →</a>', 'Manzana 2 ←</a>')
  .replace('href="manzana-3.html" class="btn-outline"', 'href="manzana-2.html" class="btn-outline"')
  .replace('Manzana%202">', 'Manzana%203">')
  .replace('Manzana%202"', 'Manzana%203"')
  .replace('Catálogo Manzana 2', 'Catálogo Manzana 3')
  .replace('Precios <span>Manzana 2</span>', 'Precios <span>Manzana 3</span>')
  .replace('conocer Manzana 2?', 'conocer Manzana 3?');

fs.writeFileSync('manzana-3.html', m3);
console.log('manzana-3.html created');
