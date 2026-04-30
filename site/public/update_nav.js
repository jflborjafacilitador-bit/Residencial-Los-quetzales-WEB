const fs = require('fs');
const files = ['index.html','catalogo-quetzal.html','catalogo-quetzal-plus.html','propiedades.html','contacto.html'];
const patterns = [
  { from: 'href="catalogo-quetzal.html" class="active">Modelo Quetzal</a>\n    <a href="catalogo-quetzal-plus.html">Modelo Quetzal Plus</a>', to: 'href="manzana-2.html">Manzana 2</a>\n    <a href="manzana-3.html">Manzana 3</a>' },
  { from: 'href="catalogo-quetzal.html">Modelo Quetzal</a>\n    <a href="catalogo-quetzal-plus.html" class="active">Modelo Quetzal Plus</a>', to: 'href="manzana-2.html">Manzana 2</a>\n    <a href="manzana-3.html">Manzana 3</a>' },
  { from: 'href="catalogo-quetzal.html">Modelo Quetzal</a>\n    <a href="catalogo-quetzal-plus.html">Modelo Quetzal Plus</a>', to: 'href="manzana-2.html">Manzana 2</a>\n    <a href="manzana-3.html">Manzana 3</a>' },
];
files.forEach(f => {
  let h = fs.readFileSync(f, 'utf8');
  patterns.forEach(p => { h = h.split(p.from).join(p.to); });
  fs.writeFileSync(f, h);
  console.log('updated: ' + f);
});
