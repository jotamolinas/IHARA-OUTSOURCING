const fs = require('fs');
let code = fs.readFileSync('translations.ts', 'utf-8');

const replacements = [
  [
    /El Régimen de Maquila como Ventaja Competitiva 2024/g,
    'Régimen de Maquila 2024: Ventajas Fiscales en el Mercosur para Inversores'
  ],
  [
    /Descubra cómo el tributo único del 1% está transformando a Paraguay en el hub industrial del Mercosur\./g,
    'Aproveche el tributo único del 1% y optimice la agilidad operativa de su empresa. Paraguay es su mejor opción corporativa.'
  ],
  [
    /Constitución de EAS: Agilidad Digital y Seguridad/g,
    'Constitución de EAS y Apertura de Sucursales: Agilidad Operativa y Seguridad Jurídica'
  ],
  [
    /La guía definitiva para abrir su empresa en Paraguay de forma remota y en menos de 72 horas\./g,
    'La guía B2B definitiva para la apertura de sucursales en Paraguay de forma remota, con máxima agilidad operativa en menos de 72 horas.'
  ],
  [
    /Las Empresas por Acciones Simplificadas \(EAS\), introducidas por la Ley 6446\/19, han marcado un hito en la desburocratización del clima de negocios en Paraguay\. Este modelo societario permite a emprendedores e inversores, tanto nacionales como extranjeros, constituir una persona jurídica de manera 100% digital a través del Sistema Unificado de Apertura y Cierre de Empresas \(SUACE\)\. A diferencia de las Sociedades Anónimas tradicionales, que requieren procesos notariales y publicaciones extensas, la EAS puede estar operativa en un plazo récord de 72 horas hábiles\. \\n\\nUna de las características más disruptivas de la EAS es la posibilidad de ser constituida por un solo socio \(unipersonal\), lo que otorga una flexibilidad inmensa para estructuras de holding o pequeñas subsidiarias\. Los estatutos son estandarizados pero permiten modificaciones específicas para adaptarse a las necesidades del negocio\. En Ihara Outsourcing, acompañamos al inversor en todo el proceso de registro, obtención de RUC ante la SET y la apertura de cuentas bancarias corporativas\. La EAS no solo reduce costos de constitución, sino que también facilita la obtención de residencias para inversores bajo la Ley 60\/90\. En un mundo donde el tiempo es el activo más valioso, Paraguay ofrece a través de la EAS una puerta de entrada rápida, económica y legalmente robusta para capturar las oportunidades del Mercosur\./g,
    'Las Empresas por Acciones Simplificadas (EAS) y la apertura de sucursales corporativas permiten una desburocratización sin precedentes. Este modelo facilita a inversores B2B constituir su empresa 100% digital, garantizando una agilidad operativa superior frente a otras jurisdicciones. Ideal para corporaciones que buscan instalarse en la región y aprovechar las ventajas fiscales en el Mercosur. \\n\\nEn Ihara Outsourcing estructuramos su holding o subsidiaria con procesos estandarizados y flexibles. Nuestro servicio integral llave en mano incluye registro, RUC y cuentas bancarias. La apertura de sucursales bajo este esquema reduce drásticamente el time-to-market, ofreciendo a las corporaciones una plataforma segura y eficiente para capitalizar las ventajas fiscales en el Mercosur y escalar a nivel regional.'
  ],
  [
    /Estrategias para Invertir en Paraguay con Seguridad Jurídica/g,
    'Apertura de Sucursales y Ventajas Fiscales en el Mercosur: Su Hub Corporativo'
  ],
  [
    /Consultoría estratégica senior con más de 30 años impulsando el desarrollo industrial y agroganadero\./g,
    'Consultoría B2B especializada en estructuración corporativa, apertura de sucursales y agilidad operativa para inversores internacionales.'
  ],
  [
    /Ingeniería de mercado integral diseñada para asegurar un aterrizaje eficiente de capitales\./g,
    'Ingeniería de mercado integral B2B diseñada para asegurar un aterrizaje eficiente de capitales y la rápida apertura de sucursales.'
  ],
  [
    /Gestión operativa total bajo la modalidad llave en mano para empresas extranjeras\./g,
    'Gestión operativa B2B total bajo modalidad llave en mano, garantizando máxima agilidad operativa para su corporación.'
  ],
  [
    /Seguridad legal absoluta para sus activos y operaciones en territorio paraguayo\./g,
    'Seguridad legal absoluta para sus activos, apertura de sucursales y operaciones corporativas en territorio paraguayo, maximizando ventajas fiscales en el Mercosur.'
  ]
];

replacements.forEach(([regex, replacement]) => {
  code = code.replace(regex, replacement);
});

fs.writeFileSync('translations.ts', code);
console.log("Replaced successfully!");
