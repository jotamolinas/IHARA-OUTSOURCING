
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight, Shield, Scale, Settings, Target, BarChart3, Users, Layout, Sprout, Beef, X, CheckCircle2, TrendingUp } from 'lucide-react';

// --- STRATEGIC MAP DIAGRAM ---
export const StrategicMapDiagram: React.FC = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto p-10 bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <div className="p-6 bg-ihara-red/10 border border-ihara-red/30 rounded-xl text-center">
          <div className="mb-4 flex justify-center"><Globe className="text-ihara-red" size={32}/></div>
          <h4 className="text-xs font-black uppercase mb-3 tracking-widest">Ruta de Exportación 1</h4>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Atraer industrias de <span className="text-white font-bold">Argentina y Brasil</span> hacia Paraguay para exportar a la <span className="text-white font-bold">Unión Europea</span>.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-ihara-red">
            <span className="text-[10px] font-bold">Mercosur</span>
            <ArrowRight size={12}/>
            <span className="text-[10px] font-bold">Paraguay</span>
            <ArrowRight size={12}/>
            <span className="text-[10px] font-bold">U.E.</span>
          </div>
        </div>

        <div className="p-6 bg-white/5 border border-white/20 rounded-xl text-center">
          <div className="mb-4 flex justify-center text-white"><Globe size={32}/></div>
          <h4 className="text-xs font-black uppercase mb-3 tracking-widest">Ruta de Inversión 2</h4>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Atraer industria <span className="text-white font-bold">Europea</span> aprovechando la eliminación de aranceles y el acceso al <span className="text-white font-bold">Mercosur y Chile</span>.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-white/40">
            <span className="text-[10px] font-bold">U.E.</span>
            <ArrowRight size={12}/>
            <span className="text-[10px] font-bold">Paraguay</span>
            <ArrowRight size={12}/>
            <span className="text-[10px] font-bold">Mercosur</span>
          </div>
        </div>

        <div className="p-6 bg-white/5 border border-white/20 rounded-xl text-center">
          <div className="mb-4 flex justify-center text-white"><BarChart3 size={32}/></div>
          <h4 className="text-xs font-black uppercase mb-3 tracking-widest">Fortalecimiento Local</h4>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Potenciar el <span className="text-white font-bold">Mercado Local</span> considerando el incremento de la ventaja competitiva industrial.
          </p>
          <div className="mt-4 inline-block px-3 py-1 bg-ihara-red rounded-full text-[9px] font-black uppercase">Ventaja Competitiva</div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
         <div className="w-[800px] h-[800px] border border-white rounded-full"></div>
         <div className="w-[600px] h-[600px] border border-white rounded-full absolute"></div>
      </div>
    </div>
  );
};

// --- SERVICE GRID ---
export const ServiceGrid: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const WHATSAPP_NUMBER = "595993282213";

  const services = [
    { 
      title: "Consultoría", 
      icon: <Users size={24}/>, 
      shortDesc: "Asesoramiento estratégico para la apertura, transición o expansión empresarial.",
      extendedDesc: "Ihara Outsourcing actúa como el socio estratégico fundamental para el inversor global. Nuestro proceso de consultoría no se limita a pasos administrativos; realizamos una ingeniería de mercado completa. Analizamos la viabilidad económica en tiempo real, identificamos clusters industriales sinérgicos en Paraguay y estructuramos una hoja de ruta que minimiza riesgos operativos mientras maximiza el aprovechamiento de los tratados internacionales vigentes.",
      points: [
        "Estudios de factibilidad y análisis de mercado regional",
        "Estructuración de holdings y vehículos de inversión",
        "Estrategias de entrada al Mercosur vía Paraguay",
        "Mediación de alto nivel con entes gubernamentales",
        "Selección de sitios óptimos (Parques vs Zonas Francas)",
        "Análisis predictivo de ROI industrial"
      ]
    },
    { 
      title: "Administración", 
      icon: <Layout size={24}/>, 
      shortDesc: "Gestión operativa total para dejar su negocio listo para competir globalmente.",
      extendedDesc: "Nuestra división administrativa elimina la fricción operativa de establecerse en un país nuevo. Implementamos sistemas de gestión 'llave en mano' que cubren desde la arquitectura de recursos humanos hasta la contabilidad corporativa transparente. Esto permite que el equipo directivo del inversor mantenga su enfoque exclusivo en el 'core business', mientras Ihara garantiza que la maquinaria administrativa local funcione con precisión suiza bajo normativas paraguayas.",
      points: [
        "Gestión de Nómina y Recursos Humanos especializados",
        "Contabilidad corporativa y auditoría interna",
        "Administración de activos y mantenimiento industrial",
        "Sistemas de reporte en tiempo real para casa matriz",
        "Gestión de compras y proveedores locales",
        "Cumplimiento de estándares ISO locales"
      ]
    },
    { 
      title: "Legislación", 
      icon: <Scale size={24}/>, 
      shortDesc: "Manejo experto de leyes tributarias y de Maquila para maximizar productividad.",
      extendedDesc: "Navegamos el complejo ecosistema legal paraguayo para blindar su inversión. Somos especialistas en la Ley 1064 (Maquila) y la Ley 60/90 (Incentivos Fiscales), asegurando que cada dólar invertido aproveche las exoneraciones tributarias máximas. Nuestra asesoría técnica traduce las leyes en ahorros directos, optimizando la estructura fiscal desde la importación de maquinaria hasta la remesa de dividendos al extranjero.",
      points: [
        "Implementación estratégica de la Ley de Maquila",
        "Gestión de beneficios bajo la Ley 60/90",
        "Asesoría en tratados de libre comercio (Mercosur/Chile)",
        "Estructuración tributaria para exportación",
        "Gestión de registros ante el MIC y el CNIME",
        "Blindaje legal en contratación internacional"
      ]
    },
    { 
      title: "Agricultura", 
      icon: <Sprout size={24}/>, 
      shortDesc: "Consultoría técnica en agronegocios y gestión de exportación de granos.",
      extendedDesc: "Paraguay es el granero del mundo, y nosotros somos su guía técnica. Asesoramos en la adquisición y gestión de tierras agrícolas, modernización de cultivos extensivos y optimización de la cadena de valor de exportación. Nuestra consultoría integra tecnologías de agricultura de precisión con el conocimiento del mercado global de commodities, asegurando que la producción paraguaya cumpla con las certificaciones internacionales más exigentes.",
      points: [
        "Due diligence en adquisición de tierras rurales",
        "Modernización tecnológica de cultivos extensivos",
        "Gestión logística de exportación de soja y maíz",
        "Certificaciones de sostenibilidad para la U.E.",
        "Análisis de suelos y optimización de rendimientos",
        "Implementación de trazabilidad desde el surco"
      ]
    },
    { 
      title: "Ganadería", 
      icon: <Beef size={24}/>, 
      shortDesc: "Gestión de trazabilidad y acceso a mercados cárnicos premium internacionales.",
      extendedDesc: "Elevamos la ganadería paraguaya a niveles de excelencia mundial. Nuestra consultoría técnica se especializa en la implementación de sistemas de trazabilidad animal de punta, protocolos de mejoramiento genético y gestión de calidad en frigoríficos. Facilitamos el acceso a mercados premium como la Cuota Hilton europea y el mercado estadounidense, posicionando la carne paraguaya como un producto de alta gama por su naturalidad y eficiencia.",
      points: [
        "Sistemas electrónicos de trazabilidad individual",
        "Asesoría en genética y reproducción de alta gama",
        "Protocolos de certificación para mercados de exportación",
        "Gestión de cadena de frío y logística internacional",
        "Consultoría en nutrición y bienestar animal",
        "Acompañamiento en procesos de faena y exportación"
      ]
    },
    { 
      title: "Seguridad Jurídica", 
      icon: <Shield size={24}/>, 
      shortDesc: "Garantizamos estabilidad a su inversión mediante un marco legal sólido.",
      extendedDesc: "La seguridad es el cimiento de toda gran inversión. En Ihara, proveemos un blindaje legal integral que garantiza la propiedad privada y la estabilidad de las reglas de juego. Actuamos como centinelas de su capital, utilizando los tratados internacionales de protección de inversiones y las leyes locales de fomento para asegurar que su empresa opere en un ambiente de absoluta previsibilidad jurídica en el territorio nacional.",
      points: [
        "Protección de activos intangibles y patentes",
        "Contratos con cláusulas de arbitraje internacional",
        "Asesoría en leyes de garantía de inversiones",
        "Blindaje de propiedad privada y títulos de tierra",
        "Representación legal ante litigios corporativos",
        "Cumplimiento de normativas de prevención de lavado"
      ]
    },
    { 
      title: "Planificación", 
      icon: <Target size={24}/>, 
      shortDesc: "Prospección y organización detallada de su inversión para asegurar el éxito.",
      extendedDesc: "El éxito no es producto del azar, sino de una planificación metódica. Diseñamos planes maestros industriales que contemplan cada variable: desde tiempos de construcción y montaje de plantas hasta proyecciones de flujo de caja multianuales. Nuestra metodología de planificación 'Agile Industrial' permite ajustar la estrategia ante cambios de mercado sin perder de vista el objetivo de rentabilidad final, garantizando una ejecución impecable del proyecto.",
      points: [
        "Modelado financiero y proyecciones de ROI a 10 años",
        "Cronogramas maestros de ejecución llave en mano",
        "Análisis de riesgo y planes de contingencia operativa",
        "Planificación de la cadena de suministro integrada",
        "Estrategias de escalabilidad de producción",
        "Optimización de costos variables de energía"
      ]
    },
    { 
      title: "Outsourcing Presupuestario", 
      icon: <Settings size={24}/>, 
      shortDesc: "Flexibilidad total: pague únicamente por los servicios específicos que necesite.",
      extendedDesc: "Revolucionamos la estructura de costos de su empresa. A través de nuestro modelo de outsourcing presupuestario, permitimos que las empresas operen con una estructura administrativa 'lean'. Usted solo paga por los servicios que utiliza, transformando costos fijos en variables. Esto proporciona una flexibilidad financiera crucial durante las fases de arranque y expansión, permitiendo un uso mucho más eficiente del capital operativo disponible.",
      points: [
        "Conversión de CAPEX administrativo en OPEX",
        "Estructura de costos modular y escalable",
        "Acceso a directivos C-Level externos",
        "Eliminación de cargas laborales fijas innecesarias",
        "Contratación por hitos de proyecto específicos",
        "Optimización de recursos financieros bajo demanda"
      ]
    }
  ];

  const handleAgendarConsultoria = (serviceTitle: string) => {
    const text = encodeURIComponent(`Hola, me gustaría agendar una consultoría técnica sobre el servicio de: ${serviceTitle}.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedService(i)}
            className="p-8 bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all border-b-4 hover:border-b-ihara-red cursor-pointer group rounded-xl"
          >
            <div className="w-12 h-12 bg-ihara-red/10 text-ihara-red flex items-center justify-center mb-6 group-hover:bg-ihara-red group-hover:text-white transition-colors duration-300 rounded-lg">
              {s.icon}
            </div>
            <h3 className="font-sans text-xl font-black uppercase mb-4 tracking-tighter leading-tight">{s.title}</h3>
            <p className="text-ihara-gray text-xs leading-relaxed font-medium mb-4">{s.shortDesc}</p>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ihara-red flex items-center gap-1 group-hover:gap-2 transition-all">
              Leer Más <ArrowRight size={10} />
            </span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedService !== null && (
          <>
            {/* Background Overlay with Sophisticated Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-ihara-dark/95 backdrop-blur-md z-[110]"
            />

            {/* Modal Container: Flexbox Centering Strategy */}
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="pointer-events-auto w-full max-w-3xl bg-white rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.4)] border border-white/20 max-h-[90vh] flex flex-col"
              >
                {/* Visual Accent Top */}
                <div className="h-2 bg-ihara-red w-full"></div>
                
                <div className="relative p-8 md:p-14 overflow-y-auto custom-scrollbar">
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="absolute top-8 right-8 text-ihara-gray hover:text-ihara-red transition-all p-2 bg-stone-100 rounded-full"
                  >
                    <X size={24} />
                  </button>

                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                    <div className="w-20 h-20 bg-ihara-red text-white flex items-center justify-center rounded-3xl shadow-2xl shrink-0">
                      {services[selectedService].icon}
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-ihara-dark leading-none text-center md:text-left">
                        {services[selectedService].title}
                      </h2>
                      <div className="flex items-center gap-2 mt-4 justify-center md:justify-start">
                        <TrendingUp size={14} className="text-ihara-red" />
                        <p className="text-ihara-red font-black text-[11px] uppercase tracking-[0.4em]">
                          Estrategia Industrial Senior
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="relative">
                      <p className="text-ihara-gray text-lg md:text-xl font-medium leading-relaxed italic border-l-8 border-ihara-red pl-8 py-4 bg-stone-50 rounded-r-2xl">
                        {services[selectedService].extendedDesc}
                      </p>
                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-[1.5rem] border-2 border-stone-100 shadow-sm">
                      <h4 className="font-black text-ihara-dark uppercase text-[12px] tracking-[0.3em] mb-8 border-b-2 border-stone-100 pb-4 flex items-center gap-3">
                         <CheckCircle2 size={18} className="text-ihara-red" /> Capacidades Clave & Puntos de Valor
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
                        {services[selectedService].points.map((p, idx) => (
                          <div key={idx} className="flex items-start gap-4 group/point">
                            <div className="w-1.5 h-1.5 bg-ihara-red mt-1.5 shrink-0 group-hover/point:scale-150 transition-transform"></div>
                            <span className="text-[12px] font-black text-ihara-gray leading-tight uppercase tracking-tight">{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => handleAgendarConsultoria(services[selectedService].title)}
                      className="flex-[2] py-5 bg-ihara-red text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-ihara-dark transition-all shadow-xl active:scale-95"
                    >
                      Agendar Consultoría Técnica
                    </button>
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="flex-1 py-5 bg-ihara-dark text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-ihara-gray transition-all shadow-xl active:scale-95"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAQUILA BENEFITS ---
export const MaquilaBenefits: React.FC = () => {
  return (
    <div className="space-y-4">
      {[
        "Entrada al territorio con liberación de tributos",
        "Maquinaria y materias primas sin aranceles de importación",
        "Posibilidad de exportación o reexportación simplificada",
        "Uso intensivo de recursos energéticos y humanos locales"
      ].map((text, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-ihara-red shrink-0"></div>
          <p className="text-ihara-gray font-bold text-sm uppercase tracking-wide">{text}</p>
        </div>
      ))}
    </div>
  );
};
