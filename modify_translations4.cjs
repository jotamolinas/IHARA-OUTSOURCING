const fs = require('fs');
let code = fs.readFileSync('translations.ts', 'utf-8');

const replacements = [
  [
    /"La formación de nuestra EAS a través de Ihara fue el proceso más eficiente que hemos experimentado en el Cono Sur\. Seguridad jurídica de primer nivel\."/g,
    '"La constitución de nuestra EAS con Ihara ha sido el proceso más ágil del Cono Sur. Seguridad corporativa total y una apertura de sucursales sin fricciones."'
  ],
  [
    /"El análisis de mercado y la orientación sobre la Ley 60\/90 nos ahorraron cientos de miles de dólares en costos iniciales\. Recomendamos Ihara al 100%\."/g,
    '"Su consultoría B2B y estructuración bajo la Ley 60/90 maximizaron nuestras ventajas fiscales en el Mercosur, ahorrando cientos de miles en la fase de apertura."'
  ],
  [
    /"Gracias a Ihara descubrimos el valor de Ciudad del Este para el ensamble y distribución hacia Brasil\."/g,
    '"Gracias a su gestión, centralizamos nuestra apertura de sucursales en Ciudad del Este, logrando una agilidad operativa inigualable para distribuir a todo Brasil."'
  ],
  [
    /"Paraguay consolida Grado de Inversión"/g,
    '"Grado de Inversión en Paraguay: Seguridad y Agilidad Operativa"'
  ],
  [
    /"Récord Histórico en Exportanciones del Sector Maquila"/g,
    '"Récord en Exportaciones Maquila: Ventajas Fiscales en el Mercosur"'
  ],
  [
    /"Avance del Corredor Bioceánico y la Integración Regional"/g,
    '"Corredor Bioceánico: Apertura de Sucursales y Conectividad Regional"'
  ]
];

let totalReplaced = 0;
replacements.forEach(([regex, replacement]) => {
  const previousCode = code;
  code = code.replace(regex, replacement);
  if (previousCode !== code) {
    totalReplaced++;
  } else {
    console.log("Failed to match regex:", regex);
  }
});

fs.writeFileSync('translations.ts', code);
console.log(`Replaced ${totalReplaced} instances successfully!`);
