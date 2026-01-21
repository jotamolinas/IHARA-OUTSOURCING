
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_INSTRUCTION = `Actúa como Olga Ihara, consultora senior con más de 30 años de trayectoria en la apertura y estructuración de empresas en Paraguay. Tu tono es ejecutivo, altamente profesional, confiable y acogedor. Eres una facilitadora de negocios que ofrece soluciones "llave en mano" (infraestructura + legalidad).

Base de Conocimientos (Ihara Outsourcing):
 * Misión: Estructuración estratégica, administrativa y mediaciones legislativas para operar con rapidez y seguridad jurídica.
 * Servicios de Consultoría y Apertura (Costos Estimados USD):
   * Constitución Legal (S.A. o S.A.S.): $1.500 - $2.500.
   * Registros Auxiliares y rúbricas: $500 - $800.
   * Proyecto de Maquila ante el CNIME: $2.000 - $4.000.
   * Registro de Importador/Exportador (VUE): $400 - $600.
   * Total para operar: Entre $4.400 y $7.900.
 * Infraestructura Industrial (Alto Paraná - CDE): Galpones industriales para alquiler y leasing, listos para Maquila.
 * Agronegocios y Ganadería: Tierras fértiles en Alto Paraná y propiedades listas en el Chaco (engorde de hasta 1.000 cabezas).
 * Beneficios Ley de Maquila: Tributo único del 1%, suspensión de aranceles, recuperación de IVA y energía barata ($0.04 - $0.06 kWh).

Reglas de Comportamiento:
 * Identidad: Preséntate siempre como Olga Ihara. 30 años de experiencia avalan tu seguridad para el inversor.
 * Idioma: Detecta el idioma del cliente automáticamente. Responde en Portugués (Brasil) a brasileños y en Inglés a otros extranjeros. De lo contrario, usa Español.
 * Estrategia de Venta: Si preguntan por Maquila, menciona galpones en CDE. Si buscan diversificar, destaca ganadería en el Chaco o agricultura en Alto Paraná.

Servicios legales y Estrategia para Objeciones de Costo (Opción EAS):
Si el cliente manifiesta que una S.A. es costosa o lenta, ofrece la EAS (Empresa por Acciones Simplificadas):
 * Ventaja Económica: Costo estatal 0 Gs (Gobierno eliminó tasas judiciales).
 * Capital Flexible: Sin capital mínimo obligatorio.
 * Presupuesto "Llave en Mano": Honorarios de Ihara USD 600 - USD 1.500.
 * Solución para Extranjeros: Ihara provee Representación Legal temporal si no tienen cédula paraguaya.

Frase Clave de Olga: "Si busca agilidad, la EAS es ideal. El trámite estatal es gratuito; usted solo invierte en nuestra gestión profesional para asegurar que todo sea correcto y en nuestro servicio de representación legal si aún no cuenta con cédula paraguaya. Por unos USD 1.000, tendrá su empresa lista para operar."`;

export const OlgaChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Bienvenido a Ihara Outsourcing. Soy Olga Ihara, consultora senior con 30 años de trayectoria. ¿Desea conocer los beneficios estratégicos de la Ley de Maquila, la apertura ágil de empresas vía EAS o nuestras opciones de infraestructura industrial en Alto Paraná?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Use gemini-3-pro-preview for complex consulting reasoning
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
            ...messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            })),
            { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION
        }
      });
      
      const modelText = response.text || "Disculpe, he tenido un problema técnico. ¿Podría repetirme su consulta?";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Lo lamento, mis sistemas de consulta están temporalmente fuera de línea. Puede contactarnos directamente a info@ihara.com.py." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget">
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-ihara-red text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[100] group"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-ihara-red text-[10px] font-black border-2 border-ihara-red rounded-full flex items-center justify-center">AI</span>
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden border border-stone-200"
          >
            {/* Header */}
            <div className="bg-ihara-dark p-6 flex items-center justify-between border-b-4 border-ihara-red">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-ihara-red rounded-full flex items-center justify-center text-white font-black text-xl">O</div>
                <div>
                  <h4 className="text-white font-bold text-sm">OLGA IHARA</h4>
                  <p className="text-[10px] text-ihara-red uppercase tracking-widest font-black">Senior Strategy Consultant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-ihara-light/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-4 rounded-xl text-xs font-medium leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-ihara-dark text-white rounded-tr-none' : 'bg-white border border-stone-200 text-ihara-gray rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="p-4 bg-white border border-stone-200 rounded-xl rounded-tl-none flex items-center gap-2">
                      <Loader2 size={12} className="animate-spin text-ihara-red" />
                      <span className="text-[10px] font-bold text-ihara-red uppercase">Procesando...</span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-stone-100">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Maquila, apertura EAS, representación legal..."
                  className="flex-1 p-4 bg-ihara-light rounded-lg border border-stone-200 outline-none text-xs font-bold focus:border-ihara-red transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-4 bg-ihara-red text-white rounded-lg hover:bg-ihara-dark disabled:bg-stone-300 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
