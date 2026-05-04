// Inventario Residencial Los Quetzales â€” 1 Mayo 2026
// Fuente: Inventario 1 mayo 2026.xlsx

const INVENTARIO = [
  { mza: 2, casa: 2, privada: "TUCAN", prototipo: "QUETZAL", m2Const: "80.28", m2Terreno: "61.25", esquema: "NO APLICA PARA INFONAVIT TRADICIONAL, NI TOTAL MENOR A 11 UMAS", estatus: "disponible", entrega: "INMEDIATA" },
  { mza: 2, casa: 3, privada: "TUCAN", prototipo: "QUETZAL", m2Const: "80.28", m2Terreno: "61.25", esquema: "NO APLICA PARA INFONAVIT TRADICIONAL, NI TOTAL MENOR A 11 UMAS", estatus: "disponible", entrega: "INMEDIATA" },
  { mza: 2, casa: 4, privada: "TUCAN", prototipo: "QUETZAL", m2Const: "81", m2Terreno: "62.5", esquema: "NO APLICA PARA INFONAVIT TRADICIONAL, NI TOTAL MENOR A 11 UMAS", estatus: "disponible", entrega: "INMEDIATA" },
  { mza: 2, casa: 6, privada: "TUCAN", prototipo: "QUETZAL", m2Const: "80.28", m2Terreno: "61.25", esquema: "NO APLICA PARA INFONAVIT TRADICIONAL, NI TOTAL MENOR A 11 UMAS", estatus: "disponible", entrega: "INMEDIATA" },
  { mza: 2, casa: 7, privada: "TUCAN", prototipo: "QUETZAL", m2Const: "80.28", m2Terreno: "61.25", esquema: "NO APLICA PARA INFONAVIT TRADICIONAL, NI TOTAL MENOR A 11 UMAS", estatus: "disponible", entrega: "SEMANA 40" },
  { mza: 2, casa: 14, privada: "TUCAN", prototipo: "QUETZAL PLUS", m2Const: "111.81", m2Terreno: "62.5", esquema: "NO APLICA PARA INFONAVIT TRADICIONAL, NI TOTAL MENOR A 11 UMAS", estatus: "no-disponible", entrega: "INMEDIATA" },
  { mza: 2, casa: 26, privada: "TUCAN", prototipo: "QUETZAL PLUS", m2Const: "111.81", m2Terreno: "62.5", esquema: "NO APLICA PARA INFONAVIT TRADICIONAL, NI TOTAL MENOR A 11 UMAS", estatus: "disponible", entrega: "INMEDIATA" },
  { mza: 2, casa: 27, privada: "TUCAN", prototipo: "QUETZAL PLUS", m2Const: "110.73", m2Terreno: "61.25", esquema: "NO APLICA PARA INFONAVIT TRADICIONAL, NI TOTAL MENOR A 11 UMAS", estatus: "disponible", entrega: "INMEDIATA" },
  { mza: 2, casa: 34, privada: "TUCAN", prototipo: "QUETZAL PLUS", m2Const: "111.81", m2Terreno: "62.5", esquema: "NO APLICA PARA INFONAVIT TRADICIONAL, NI TOTAL MENOR A 11 UMAS", estatus: "disponible", entrega: "INMEDIATA" },
  { mza: 2, casa: 35, privada: "TUCAN", prototipo: "QUETZAL PLUS", m2Const: "110.73", m2Terreno: "61.25", esquema: "NO APLICA PARA INFONAVIT TRADICIONAL, NI TOTAL MENOR A 11 UMAS", estatus: "disponible", entrega: "INMEDIATA" },
  { mza: 2, casa: 36, privada: "TUCAN", prototipo: "QUETZAL PLUS", m2Const: "111.81", m2Terreno: "62.5", esquema: "NO APLICA PARA INFONAVIT TRADICIONAL, NI TOTAL MENOR A 11 UMAS", estatus: "disponible", entrega: "INMEDIATA" },
  { mza: 3, casa: 1, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "81.002", m2Terreno: "62.5", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 38" },
  { mza: 3, casa: 2, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "80.282", m2Terreno: "61.25", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 39" },
  { mza: 3, casa: 3, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "80.282", m2Terreno: "61.25", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 40" },
  { mza: 3, casa: 4, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "81.002", m2Terreno: "62.5", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 41" },
  { mza: 3, casa: 5, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "81.002", m2Terreno: "62.5", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 42" },
  { mza: 3, casa: 6, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "80.282", m2Terreno: "61.25", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 43" },
  { mza: 3, casa: 7, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "80.282", m2Terreno: "61.25", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 44" },
  { mza: 3, casa: 8, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "81.002", m2Terreno: "62.5", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 45" },
  { mza: 3, casa: 9, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "81.002", m2Terreno: "62.5", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 46" },
  { mza: 3, casa: 10, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "80.282", m2Terreno: "61.25", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 47" },
  { mza: 3, casa: 11, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "80.282", m2Terreno: "61.25", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 48" },
  { mza: 3, casa: 12, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "81.002", m2Terreno: "62.5", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 49" },
  { mza: 3, casa: 13, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "81.002", m2Terreno: "62.5", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 50" },
  { mza: 3, casa: 14, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "80.282", m2Terreno: "61.25", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 51" },
  { mza: 3, casa: 15, privada: "AVE DE PARAISO", prototipo: "QUETZAL ROOF", m2Const: "80.282", m2Terreno: "61.25", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 52" },
  { mza: 3, casa: 17, privada: "AVE DE PARAISO", prototipo: "QUETZAL PLUS", m2Const: "111.812", m2Terreno: "62.5", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 54" },
  { mza: 3, casa: 18, privada: "AVE DE PARAISO", prototipo: "QUETZAL PLUS", m2Const: "110.732", m2Terreno: "61.25", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 55" },
  { mza: 3, casa: 19, privada: "AVE DE PARAISO", prototipo: "QUETZAL PLUS", m2Const: "110.732", m2Terreno: "61.25", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 56" },
  { mza: 3, casa: 20, privada: "AVE DE PARAISO", prototipo: "QUETZAL PLUS", m2Const: "111.812", m2Terreno: "62.5", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 57" },
  { mza: 3, casa: 21, privada: "AVE DE PARAISO", prototipo: "QUETZAL PLUS", m2Const: "111.812", m2Terreno: "62.5", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 58" },
  { mza: 3, casa: 22, privada: "AVE DE PARAISO", prototipo: "QUETZAL PLUS", m2Const: "110.732", m2Terreno: "61.25", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 59" },
  { mza: 3, casa: 23, privada: "AVE DE PARAISO", prototipo: "QUETZAL PLUS F.A.", m2Const: "110.732", m2Terreno: "61.25", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 60" },
  { mza: 3, casa: 24, privada: "AVE DE PARAISO", prototipo: "QUETZAL PLUS F.A.", m2Const: "111.812", m2Terreno: "62.5", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 61" },
  { mza: 3, casa: 25, privada: "AVE DE PARAISO", prototipo: "QUETZAL PLUS F.A.", m2Const: "111.812", m2Terreno: "62.5", esquema: "TODOS LOS CREDITOS", estatus: "no-disponible", entrega: "SEMANA 62" },
];

// EstadÃ­sticas por manzana
function getStats(mza) {
  const f = mza ? INVENTARIO.filter(e => e.mza === mza) : INVENTARIO;
  return {
    total: f.length,
    disponibles: f.filter(e => e.estatus === "disponible").length,
    noDisponibles: f.filter(e => e.estatus === "no-disponible").length,
  };
}
