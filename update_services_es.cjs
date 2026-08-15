const fs = require('fs');
let code = fs.readFileSync('translations.ts', 'utf-8');

const getServicesRegex = /const getServices = \(lang: string\) => \{\s*const data: any = \{\s*es: \[\s*([\s\S]*?)\s*\],\s*en: \[/m;

const newEs = `{ 
        title: "Apertura de Empresas y EAS", 
        shortDesc: "Apertura ágil de empresas y gestión corporativa integral mediante plataformas legal-tech.", 
        extendedDesc: "Apertura ágil de Sociedades Anónimas (S.A.) y Empresas por Acciones Simplificadas (EAS) en Paraguay. Gestión corporativa integral mediante plataformas legal-tech para facilitar el aterrizaje de inversores internacionales con total cumplimiento normativo.", 
        points: ["Apertura S.A. y EAS", "Gestión Corporativa", "Plataformas Legal-Tech", "Cumplimiento Normativo"] 
      },
      { 
        title: "Administración Integral", 
        shortDesc: "Servicios de representación legal corporativa y gestión administrativa para directorios internacionales.", 
        extendedDesc: "Servicios de representación legal corporativa y gestión administrativa para directorios internacionales. Facilitamos el inicio de sus operaciones comerciales en Paraguay brindando respaldo jurídico sin necesidad de residencia permanente inicial.", 
        points: ["Representación Legal", "Gestión Administrativa", "Respaldo Jurídico", "Operaciones Comerciales"] 
      },
      { 
        title: "Legislación & Maquila", 
        shortDesc: "Estructuración operativa bajo el Régimen de Maquila y beneficios de la Ley 60/90.", 
        extendedDesc: "Estructuración operativa bajo el Régimen de Maquila y los beneficios de la Ley 60/90. Maximizamos la optimización fiscal y aduanera para plantas de manufactura, procesamiento industrial y exportación dentro del Mercosur.", 
        points: ["Régimen de Maquila", "Ley 60/90", "Optimización Fiscal", "Exportación Mercosur"] 
      },
      { 
        title: "Automatización Legal", 
        shortDesc: "Automatización de procesos legales y reducción de burocracia mediante infraestructura tecnológica.", 
        extendedDesc: "Automatización de procesos legales y reducción drástica de la burocracia tradicional. Implementamos infraestructura tecnológica para la gestión documental, firmas digitales y control operativo de sucursales extranjeras con máxima eficiencia.", 
        points: ["Procesos Legales", "Infraestructura Tecnológica", "Firmas Digitales", "Gestión Documental"] 
      },
      { 
        title: "Agronegocios & Industria", 
        shortDesc: "Asesoría corporativa especializada para inversiones agroganaderas e industriales en Paraguay.", 
        extendedDesc: "Asesoría corporativa especializada para inversiones agroganaderas e industriales. Garantizamos seguridad jurídica en la adquisición de tierras y la optimización legal de proyectos de explotación en el territorio paraguayo.", 
        points: ["Asesoría Corporativa", "Inversiones Agroganaderas", "Adquisición de Tierras", "Optimización Legal"] 
      },
      { 
        title: "Blindaje Jurídico", 
        shortDesc: "Protección integral de activos, estructuración patrimonial y compliance para corporaciones.", 
        extendedDesc: "Protección integral de activos y estructuración patrimonial para corporaciones. Proveemos seguridad legal absoluta, cumplimiento normativo (compliance) y mitigación de riesgos para holdings extranjeros operando en Sudamérica.", 
        points: ["Protección de Activos", "Estructuración Patrimonial", "Compliance", "Mitigación de Riesgos"] 
      }`;

if (getServicesRegex.test(code)) {
  code = code.replace(getServicesRegex, (match, p1) => {
    return match.replace(p1, newEs);
  });
  fs.writeFileSync('translations.ts', code);
  console.log("Services updated successfully!");
} else {
  console.log("Regex did not match.");
}
