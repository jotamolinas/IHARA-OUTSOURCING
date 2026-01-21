
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef } from 'react';

declare const L: any;

export const InteractiveMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Coordenadas de Ciudad del Este (CDE), Paraguay
    const cdeCoords: [number, number] = [-25.5097, -54.6111];

    // Initialize map centered to cover from Itaipu to Presidente Franco and the Airport area
    const map = L.map(mapContainerRef.current, {
        center: [-25.4850, -54.6800],
        zoom: 11,
        scrollWheelZoom: false
    });

    // Use a clean grayscale tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Custom Icon Generator - Using refined soft-pulse
    const createCustomIcon = (colorKey: 'red' | 'dark', animate: boolean = false) => L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="relative flex items-center justify-center">
          ${animate ? `<div class="absolute w-12 h-12 bg-ihara-red/40 rounded-full animate-soft-pulse"></div>` : ''}
          <div class="relative w-7 h-7 bg-ihara-${colorKey} rounded-full border-4 border-white shadow-xl flex items-center justify-center">
             <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </div>`,
      iconSize: [28, 40],
      iconAnchor: [14, 20]
    });

    // Main HQ Marker
    const marker = L.marker(cdeCoords, { icon: createCustomIcon('red', true) }).addTo(map);
    marker.bindPopup(`
      <div class="p-2 w-48">
        <h4 class="font-bold text-ihara-red uppercase text-xs mb-1">IHARA OUTSOURCING HQ</h4>
        <p class="text-[10px] text-ihara-gray leading-tight">Sede central operativa para la estructuración de inversiones industriales y mediación legislativa en Paraguay.</p>
        <div class="mt-2 pt-2 border-t border-stone-100">
           <span class="text-[9px] font-black text-ihara-dark uppercase tracking-widest">Estratégico Tri-Frontera</span>
        </div>
      </div>
    `).openPopup();

    // Key Business & Infrastructure Hubs
    const localHubs = [
      { 
        name: "Puente de la Amistad", 
        coords: [-25.5115, -54.6062], 
        type: "Infraestructura", 
        desc: "Principal arteria logística del Mercosur que conecta Paraguay con Brasil, vital para el flujo de bienes manufacturados.",
        link: null,
        pulse: true // Added pulse for logistical importance
      },
      { 
        name: "Puente de la Integración", 
        coords: [-25.5683, -54.5936], 
        type: "Infraestructura", 
        desc: "Nueva conexión de gran envergadura entre Pdte. Franco y Foz de Iguazú, diseñada específicamente para el transporte de carga pesado.",
        pulse: true,
        link: null
      },
      { 
        name: "Aeropuerto Int. Guaraní", 
        coords: [-25.4542, -54.8428], 
        type: "Transporte", 
        desc: "Terminal estratégica de carga aérea que facilita la importación de insumos bajo el régimen de Maquila.",
        link: "http://www.dinac.gov.py/",
        pulse: true // Added pulse for logistical importance
      },
      { 
        name: "Zona Franca Global", 
        coords: [-25.4851, -54.7670], 
        type: "Industrial", 
        desc: "Parque logístico e industrial altamente competitivo, enfocado en servicios globales y manufactura de exportación.",
        link: "https://www.zfglobal.com.py/"
      },
      { 
        name: "Itaipu Binacional", 
        coords: [-25.4093, -54.5908], 
        type: "Energía", 
        desc: "Líder mundial en producción de energía hidroeléctrica, garantizando energía limpia y económica para grandes industrias.",
        link: "https://www.itaipu.gov.py/",
        pulse: true // Pulsing active to emphasize energy significance
      }
    ];

    localHubs.forEach(hub => {
      const colorKey: 'red' | 'dark' = hub.type === 'Industrial' ? 'red' : 'dark';
      const shouldAnimate = hub.pulse || false;
      
      L.marker(hub.coords, { icon: createCustomIcon(colorKey, shouldAnimate) })
        .addTo(map)
        .bindPopup(`
          <div class="p-2 w-48">
            <h5 class="font-bold text-ihara-dark uppercase text-[10px] mb-1">${hub.name}</h5>
            <div class="flex items-center gap-2 mb-2">
              <span class="inline-block px-1.5 py-0.5 bg-stone-100 text-[8px] font-black uppercase tracking-widest text-ihara-gray rounded">${hub.type}</span>
            </div>
            <p class="text-[10px] text-ihara-gray leading-relaxed mb-3">${hub.desc}</p>
            ${hub.link ? `
              <div class="pt-2 border-t border-stone-100">
                <a href="${hub.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-[9px] font-black text-ihara-red uppercase tracking-widest hover:underline">
                  Sitio Oficial <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="inline-block ml-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
            ` : ''}
          </div>
        `);
    });

    // Global Network Nodes
    const globalNodes = [
        { name: "Asunción", coords: [-25.3022, -57.6373], label: "Capital Financiera" },
        { name: "Madrid", coords: [40.4168, -3.7038], label: "Nodo Europa" },
        { name: "Miami", coords: [25.7617, -80.1918], label: "Enlace EE.UU." }
    ];

    globalNodes.forEach(node => {
        L.circleMarker(node.coords, {
            radius: 4,
            fillColor: "#1A1A1A",
            color: "#FFFFFF",
            weight: 1.5,
            opacity: 1,
            fillOpacity: 0.6
        }).addTo(map).bindPopup(`<div class="text-[9px] font-bold uppercase">${node.name}<br/><span class="text-ihara-gray font-normal lowercase">${node.label}</span></div>`);
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[500px] rounded-2xl overflow-hidden border border-stone-200 shadow-2xl relative z-0 group">
      <div ref={mapContainerRef} className="w-full h-full" style={{ background: '#f5f5f5' }} />
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md p-3 border border-stone-200 rounded shadow-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
         <p className="text-[9px] font-black uppercase tracking-widest text-ihara-red mb-2">Leyenda de Hubs</p>
         <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-ihara-red rounded-full"></div>
               <span className="text-[8px] font-bold text-ihara-dark uppercase">Sectores Industriales / HQ</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-ihara-dark rounded-full"></div>
               <span className="text-[8px] font-bold text-ihara-dark uppercase">Infraestructura & Logística</span>
            </div>
         </div>
      </div>
    </div>
  );
};
