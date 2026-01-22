import React, { useState, useRef, useCallback } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { MessageCircle, X, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

export const OlgaChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const liveSessionRef = useRef<any>(null);

  const startVoice = async () => {
    setIsLive(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: { 
            responseModalities: [Modality.AUDIO], 
            systemInstruction: "Eres Olga Ihara. Habla breve y profesional sobre inversiones en Paraguay. Usa un tono ejecutivo." 
        },
        callbacks: {
          onopen: () => { console.log("Conectado"); },
          onmessage: async (msg) => { /* Audio se maneja automáticamente en Live API si está configurado */ },
          onclose: () => setIsLive(false),
          onerror: () => setIsLive(false)
        }
      });
      liveSessionRef.current = sessionPromise;
    } catch (e) { setIsLive(false); }
  };

  const stopVoice = () => {
    if (liveSessionRef.current) liveSessionRef.current.then((s:any) => s.close());
    setIsLive(false);
  };

  return (
    <div className="chat-widget">
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 w-16 h-16 bg-ihara-red text-white rounded-full shadow-2xl flex items-center justify-center z-[100]">
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-24 right-6 w-[320px] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-[100]">
            <div className="bg-ihara-dark p-4 text-white"><h4 className="font-bold text-sm">OLGA IHARA</h4><p className="text-[10px] text-ihara-red font-black">CONSULTORA LIVE</p></div>
            <div className="p-8 text-center">
              {isLive ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-ihara-red rounded-full mx-auto animate-pulse flex items-center justify-center text-white"><Mic size={32}/></div>
                  <p className="text-xs font-bold uppercase">Olga te escucha...</p>
                  <button onClick={stopVoice} className="text-[10px] font-black text-ihara-red underline">COLGAR</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-ihara-gray font-medium">¿Deseas hablar por voz con Olga Ihara sobre tu proyecto?</p>
                  <button onClick={startVoice} className="w-full py-3 bg-ihara-red text-white font-black rounded-lg text-[10px]">INICIAR LLAMADA</button>
                </div>
              )}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};
