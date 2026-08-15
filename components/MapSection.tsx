import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY = 
  import.meta.env?.VITE_GOOGLE_MAPS_PLATFORM_KEY || 
  import.meta.env?.VITE_GOOGLE_MAPS_API_KEY || 
  (import.meta as any).env?.GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY.startsWith('AIza');

export const MapSection: React.FC<{ lang: string }> = ({ lang }) => {
  const t = {
    title: {
      es: "Nuestra Presencia Operativa",
      en: "Our Operational Presence",
      pt: "Nossa Presença Operacional",
      jp: "当社の運用拠点",
      de: "Unsere operative Präsenz",
      zh: "我们的运营网络",
      ar: "وجودنا التشغيلي"
    },
    desc: {
      es: "Visualice las principales zonas industriales y proyectos de infraestructura donde Ihara Outsourcing despliega su capacidad operativa en Paraguay.",
      en: "Visualize the key industrial zones and infrastructure projects where Ihara Outsourcing deploys its operational capacity in Paraguay.",
      pt: "Visualize as principais zonas industriais e projetos de infraestrutura onde a Ihara Outsourcing implementa sua capacidade operacional no Paraguai.",
      jp: "Ihara Outsourcingがパラグアイで運用能力を展開している主要な工業地帯とインフラプロジェクトを視覚化します。",
      de: "Visualisieren Sie die wichtigsten Industriezonen und Infrastrukturprojekte, in denen Ihara Outsourcing seine operative Kapazität in Paraguay einsetzt.",
      zh: "可视化 Ihara Outsourcing 在巴拉圭部署其运营能力的主要工业区和基础设施项目。",
      ar: "تصور المناطق الصناعية الرئيسية ومشاريع البنية التحتية التي تنشر فيها Ihara Outsourcing قدرتها التشغيلية في باراغواي."
    }
  };

  const currentLang = (t.title as any)[lang] ? lang : 'es';

  const markers = [
    { position: { lat: -25.2637, lng: -57.5759 }, title: "Asunción (Corporate HQ)" },
    { position: { lat: -25.5097, lng: -54.6111 }, title: "Ciudad del Este (Maquila Hub)" },
    { position: { lat: -27.3306, lng: -55.8667 }, title: "Encarnación (Agribusiness Node)" },
    { position: { lat: -25.5011, lng: -57.5739 }, title: "Villeta (Industrial Park)" }
  ];

  return (
    <section id="operational-map" className="py-24 bg-white border-t border-stone-100 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="max-w-2xl mb-12 text-left">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-ihara-dark">
            {(t.title as any)[currentLang]}
          </h2>
          <p className="text-stone-500 font-medium italic text-lg leading-relaxed">
            {(t.desc as any)[currentLang]}
          </p>
          <div className="h-1.5 w-24 bg-ihara-red mt-6"></div>
        </div>

        <div className="w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative bg-stone-100">
          {!hasValidKey ? (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-100/90 z-10 p-6">
              <div className="text-center max-w-lg bg-white p-8 rounded-2xl shadow-xl border border-stone-200">
                <h3 className="text-2xl font-black mb-4 text-ihara-dark">Google Maps API Key Required</h3>
                <p className="text-stone-500 mb-6">
                  To view the interactive map of our operational scope, please configure your Google Maps API key.
                </p>
                <div className="text-left text-sm text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <p className="font-bold mb-2">Setup Instructions:</p>
                  <ol className="list-decimal pl-4 space-y-2">
                    <li>Open <strong>Settings</strong> (⚙️ gear icon, top-right)</li>
                    <li>Select <strong>Secrets</strong></li>
                    <li>Add secret named <code>GOOGLE_MAPS_PLATFORM_KEY</code></li>
                    <li>Paste your API key and press Enter</li>
                  </ol>
                </div>
              </div>
            </div>
          ) : (
            <APIProvider apiKey={API_KEY} version="weekly">
              <Map
                defaultCenter={{ lat: -24.5, lng: -56.5 }}
                defaultZoom={6}
                mapId="IHARA_OPERATIONS_MAP"
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{ width: '100%', height: '100%' }}
                gestureHandling="cooperative"
                disableDefaultUI={false}
              >
                {markers.map((marker, index) => (
                  <AdvancedMarker key={index} position={marker.position} title={marker.title}>
                    <Pin background="#da291c" glyphColor="#fff" borderColor="#8a1a12" />
                  </AdvancedMarker>
                ))}
              </Map>
            </APIProvider>
          )}
        </div>
      </div>
    </section>
  );
};
