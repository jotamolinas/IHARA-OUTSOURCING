
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { MessageCircle, X, Send, Loader2, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_INSTRUCTION = `Actúa como Olga Ihara, consultora senior en Paraguay. Tu tono es ejecutivo y acogedor. Ofreces soluciones llave en mano. 
Si el usuario habla por voz, sé breve y directa, como en una llamada de negocios real. No des rodeos.`;

function encodeAudio(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function decodeAudio(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
  }
  return buffer;
}

export const OlgaChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Soy Olga Ihara. ¿Desea que hablemos sobre su próxima inversión en Paraguay? Use el micrófono para hablar en vivo conmigo.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const audioContextStack = useRef<{ input?: AudioContext; output?: AudioContext }>({});
  const liveSessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const stopLiveSession = useCallback(() => {
    if (liveSessionRef.current) {
      liveSessionRef.current.then((session: any) => session.close());
      liveSessionRef.current = null;
    }
    audioSourcesRef.current.forEach(s => s.stop());
    audioSourcesRef.current.clear();
    setIsLive(false);
  }, []);

  const startLiveSession = async () => {
    setIsLoading(true);
    setIsLive(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      if (!audioContextStack.current.input) {
        audioContextStack.current.input = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        audioContextStack.current.output = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION,
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }
        },
        callbacks: {
          onopen: () => {
            const source = audioContextStack.current.input!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextStack.current.input!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const b64 = encodeAudio(new Uint8Array(int16.buffer));
              sessionPromise.then(session => session.sendRealtimeInput({ media: { data: b64, mimeType: 'audio/pcm;rate=16000' } }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextStack.current.input!.destination);
            setIsLoading(false);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const ctx = audioContextStack.current.output!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decodeAudio(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              audioSourcesRef.current.add(source);
              source.onended = () => audioSourcesRef.current.delete(source);
            }
          },
          onclose: () => setIsLive(false),
          onerror: () => stopLiveSession()
        }
      });
      liveSessionRef.current = sessionPromise;
    } catch (err) {
      setIsLive(false);
      setIsLoading(false);
    }
  };

  const handleTextSend = async () => {
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text }] }],
        config: { systemInstruction: SYSTEM_INSTRUCTION }
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "Disculpe, hubo un error." }]);
    } catch (e) { console.error(e); } finally { setIsLoading(false); }
  };

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <div className="chat-widget">
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 w-16 h-16 bg-ihara-red text-white rounded-full shadow-2xl flex items-center justify-center z-[100]">
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <MotionDiv initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[580px] bg-white rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden border border-stone-200">
            <div className="bg-ihara-dark p-6 flex items-center justify-between border-b-4 border-ihara-red text-white">
              <div><h4 className="font-bold text-sm">OLGA IHARA</h4><p className="text-[10px] text-ihara-red uppercase font-black">{isLive ? 'Voz en Vivo' : 'Consultora Senior'}</p></div>
              <button onClick={() => { stopLiveSession(); setIsOpen(false); }}><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-ihara-light/50">
              {isLive ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="relative mb-8"><div className="absolute inset-0 bg-ihara-red/20 rounded-full animate-ping scale-150"></div><div className="relative w-24 h-24 bg-ihara-red rounded-full flex items-center justify-center text-white"><Mic size={40} /></div></div>
                  <h3 className="text-ihara-dark font-black uppercase text-sm">Olga escuchando...</h3>
                </div>
              ) : (
                <>{messages.map((msg, i) => (<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`p-4 rounded-xl text-xs font-medium shadow-sm ${msg.role === 'user' ? 'bg-ihara-dark text-white' : 'bg-white text-ihara-gray'}`}>{msg.text}</div></div>))}{isLoading && <Loader2 className="animate-spin text-ihara-red mx-auto" />}</>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white border-t border-stone-100 flex flex-col gap-3">
              <div className="flex gap-2">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleTextSend()} placeholder="Escriba aquí..." disabled={isLive} className="flex-1 p-3 bg-ihara-light rounded-lg border border-stone-200 text-xs outline-none" />
                <button onClick={handleTextSend} disabled={isLive || !input.trim()} className="p-3 bg-ihara-dark text-white rounded-lg"><Send size={18} /></button>
              </div>
              <button onClick={isLive ? stopLiveSession : startLiveSession} className={`w-full py-3 rounded-lg flex items-center justify-center gap-3 font-black uppercase text-[10px] transition-all ${isLive ? 'bg-ihara-red text-white' : 'bg-stone-100 text-ihara-gray'}`}>{isLive ? <><MicOff size={14} /> Colgar</> : <><Mic size={14} /> Hablar con Olga</>}</button>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};
