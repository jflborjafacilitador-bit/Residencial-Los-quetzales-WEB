const fs = require('fs');
let inv = fs.readFileSync('site/public/inventario.js', 'utf8');

inv = inv.replace(/casa:\s*14(.*?)estatus:\s*['"]disponible['"]/g, 'casa: 14$1estatus: "no-disponible"');
inv = inv.replace(/casa:\s*25(.*?)estatus:\s*['"]disponible['"]/g, 'casa: 25$1estatus: "no-disponible"');

fs.writeFileSync('site/public/inventario.js', inv, 'utf8');
console.log('Updated inventario.js');
