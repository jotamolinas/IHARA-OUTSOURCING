const fs = require('fs');
let code = fs.readFileSync('translations.ts', 'utf-8');

const replacements = [
  [
    /"Ihara Outsourcing hizo que nuestra instalación bajo el régimen de maquila fuera increíblemente fluida\. Su equipo dominó cada detalle legal y nos permitió operar en tiempo récord\."/g,
    '"Ihara Outsourcing garantizó una apertura de sucursales bajo el régimen de maquila impecable. Logramos una agilidad operativa récord y aprovechamos al máximo las ventajas fiscales en el Mercosur."'
  ],
  [
    /"La formación de nuestra EAS a través de Ihara fue el proceso más eficiente que hemos experimentado en el Cono Sur\. Seguridad legal de primer nivel\."/g,
    '"La constitución de nuestra EAS con Ihara ha sido el proceso más ágil del Cono Sur. Seguridad corporativa total y una apertura de sucursales sin fricciones."'
  ],
  [
    /"El análisis de mercado y la orientación sobre la Ley 60\/90 nos ahorraron cientos de miles de dólares en costos iniciales\. Recomendamos a Ihara al 100%\."/g,
    '"Su consultoría B2B y estructuración bajo la Ley 60/90 maximizaron nuestras ventajas fiscales en el Mercosur, ahorrando cientos de miles en la fase de apertura."'
  ],
  [
    /"Gracias a Ihara descubrimos el valor de Ciudad del Este para el ensamblaje y distribución hacia Brasil\."/g,
    '"Gracias a su gestión, centralizamos nuestra apertura de sucursales en Ciudad del Este, logrando una agilidad operativa inigualable para distribuir a todo Brasil."'
  ],
  [
    /"El Régimen de Maquila \(Ley 1064\/97\) es un sistema que permite a empresas extranjeras producir bienes o servicios en Paraguay con beneficios fiscales excepcionales\. El principal atractivo es el pago de un Tributo Único del 1% sobre el valor agregado o facturado por exportación, eximiendo a la empresa de impuestos a la importación de materia prima, maquinarias, IVA y otros aranceles internos\."/g,
    '"El Régimen de Maquila (Ley 1064/97) es clave para corporaciones que buscan ventajas fiscales en el Mercosur. Permite a empresas B2B producir bienes o servicios con un Tributo Único del 1% sobre el valor agregado o facturado, garantizando una agilidad operativa excepcional al exonerar aranceles a la importación de materias primas y maquinarias."'
  ],
  [
    /"Las EAS se pueden abrir en 72 horas y de manera 100% digital\. Pueden ser unipersonales \(un solo socio\), no requieren un capital mínimo e implican menores costos en escribanía y edictos\. Solo requiere registro en la plataforma SUACE con un representante legal o director ubicado en Paraguay\."/g,
    '"La apertura de sucursales mediante EAS es 100% digital y se concreta en 72 horas, brindando una agilidad operativa inigualable. Ideales para corporaciones B2B, no exigen capital mínimo y simplifican trámites. Requieren solo registro en SUACE con un representante legal en Paraguay."'
  ],
  [
    /"Absolutamente\. La Ley 60\/90 ofrece incentivos a inversiones nacionales y extranjeras que incorporen bienes de capital nuevos o que promuevan la industria en cualquier régimen\. Beneficia con la exoneración de aranceles de aduana y el IVA en la importación de maquinarias o equipos, además de eximir de retenciones en la remesa de dividendos al exterior \(por hasta 10 años dependiendo de la inversión\)\."/g,
    '"Absolutamente. La Ley 60/90 es un pilar de las ventajas fiscales en el Mercosur para inversiones corporativas. Exonera aranceles e IVA en la importación de bienes de capital y exime de retenciones en la remesa de dividendos, potenciando la rentabilidad de las nuevas aperturas de sucursales."'
  ]
];

let totalReplaced = 0;
replacements.forEach(([regex, replacement]) => {
  const previousCode = code;
  code = code.replace(regex, replacement);
  if (previousCode !== code) {
    totalReplaced++;
  } else {
    console.log("Failed to match:", regex);
  }
});

fs.writeFileSync('translations.ts', code);
console.log(`Replaced ${totalReplaced} instances successfully!`);
