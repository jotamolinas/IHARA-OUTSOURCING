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
  ],
  [
    /El agronegocio es el motor histórico de Paraguay, pero hoy está viviendo una revolución tecnológica sin precedentes impulsada por la integración de soluciones Agtech\. El uso de imágenes satelitales, drones con sensores multiespectrales, estaciones meteorológicas conectadas a la nube y sistemas de gestión basados en inteligencia artificial está permitiendo niveles de productividad que antes eran impensables\. Paraguay no solo produce commodities; produce datos que permiten una toma de decisiones precisa para maximizar el rendimiento por hectárea y optimizar el uso de insumos\. \\n\\nNuestra división de Agronegocios en Ihara Outsourcing conecta a inversores con proyectos de agricultura y ganadería de precisión\. Gestionamos la implementación de sistemas de trazabilidad blockchain, que son cada vez más exigidos por los mercados de exportación para garantizar el origen sostenible de los productos\. La inversión en tecnología aplicada al campo no solo aumenta la rentabilidad, sino que también mitiga los riesgos climáticos y operativos\. Paraguay ofrece un régimen de tenencia de la tierra seguro y una infraestructura logística en constante expansión, lo que, sumado a la adopción digital, convierte al agro paraguayo en un sector de vanguardia global\. Invertir en el campo hoy en Paraguay es invertir en una industria de alta tecnología con una demanda mundial garantizada\./g,
    'El agronegocio es el motor histórico de Paraguay, impulsado por innovaciones Agtech que fortalecen la agilidad operativa. Las ventajas fiscales en el Mercosur permiten a corporaciones agroindustriales estructurar inversiones altamente rentables. Paraguay produce commodities y datos que facilitan decisiones B2B precisas para maximizar el rendimiento.\\n\\nEn Ihara Outsourcing conectamos a corporaciones con proyectos de precisión. Gestionamos trazabilidad blockchain para asegurar la sostenibilidad exigida en exportaciones. La apertura de sucursales orientadas al agro en Paraguay aumenta la rentabilidad y mitiga riesgos. Paraguay ofrece un régimen seguro e infraestructura en expansión, convirtiéndose en el hub ideal para aprovechar las ventajas fiscales en el Mercosur y liderar en agtech global.'
  ],
  [
    /La creciente demanda de espacios industriales modernos ha generado un boom en el sector inmobiliario corporativo de Paraguay\. Ya no basta con tener un galpón; las empresas internacionales buscan parques industriales integrales que ofrezcan servicios compartidos, seguridad las 24 horas, infraestructura vial interna de alta resistencia y conectividad de fibra óptica\. Estos complejos 'Clase A' permiten reducir los costos operativos iniciales \(CAPEX\) al optar por modalidades de alquiler a largo plazo o leasing de naves industriales\. \\n\\nDesde Ihara Outsourcing, asesoramos en la selección de terrenos estratégicos en el corredor logístico que une Ciudad del Este con Asunción\. Identificamos oportunidades de inversión en el desarrollo de centros de distribución de última milla, esenciales para el crecimiento del e-commerce y la logística regional\. El retorno de inversión en naves industriales en Paraguay es uno de los más atractivos de Sudamérica, superando a menudo los rendimientos del mercado residencial\. Además, la valorización de la tierra en zonas con acceso a servicios básicos e infraestructura energética está en ascenso constante\. Ya sea para establecer su propia planta o para diversificar su cartera de activos, el sector inmobiliario industrial paraguayo ofrece una estabilidad y un crecimiento proyectado sumamente sólidos para el inversor institucional\./g,
    'La demanda de espacios industriales de Clase A ha generado un boom en el sector corporativo de Paraguay. Para corporaciones en proceso de apertura de sucursales, los parques industriales integrales ofrecen seguridad 24 horas, infraestructura vial y conectividad óptica. Estos complejos permiten a inversores B2B reducir CAPEX y operar con máxima agilidad operativa bajo las ventajas fiscales en el Mercosur.\\n\\nDesde Ihara Outsourcing asesoramos en la selección de terrenos en corredores logísticos estratégicos como Ciudad del Este. El retorno de inversión en naves industriales en Paraguay destaca en Sudamérica. Ya sea para instalar su propia planta de procesamiento y distribución regional o diversificar su cartera, el sector inmobiliario corporativo ofrece estabilidad. La apertura de sucursales en estos parques asegura a su corporación una base sólida para expandirse, apoyándose siempre en nuestra consultoría integral B2B.'
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
