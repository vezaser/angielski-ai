
import { GoogleGenAI, Type, Modality } from "@google/genai";

export const getGeminiInstance = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.warn("Brak klucza API_KEY. Sprawdź Environment Variables w panelu Vercel.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export async function fetchCategoryWords(categoryName: string): Promise<{ english: string; polish: string }[]> {
  const ai = getGeminiInstance();
  if (!ai) return [];

  try {
    const fetchPromise = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 15 basic A1 level English words related to '${categoryName}' with their Polish translations.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              english: { type: Type.STRING },
              polish: { type: Type.STRING }
            },
            required: ["english", "polish"]
          }
        }
      }
    });

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Timeout")), 5000)
    );

    const response: any = await Promise.race([fetchPromise, timeoutPromise]);
    const text = response.text;
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("Błąd pobierania słówek:", error);
    return [];
  }
}

export async function playPronunciation(text: string) {
  const ai = getGeminiInstance();
  
  // Jeśli nie ma klucza API, używamy systemowego lektora z lepszymi parametrami
  if (!ai) {
    speakFallback(text);
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say it clearly and naturally: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            // 'Zephyr' brzmi bardzo naturalnie, ciepło i mniej "elektrycznie" niż inne głosy
            prebuiltVoiceConfig: { voiceName: 'Zephyr' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const decodedData = decode(base64Audio);
      const audioBuffer = await decodeAudioData(decodedData, audioCtx, 24000, 1);
      
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();
    } else {
      speakFallback(text);
    }
  } catch (error) {
    console.error("Błąd wymowy AI, używam systemowej:", error);
    speakFallback(text);
  }
}

// Ulepszony lektor systemowy (używany gdy API nie działa)
function speakFallback(text: string) {
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.lang = 'en-US';
  uttr.rate = 0.9; // Nieco wolniej, żeby było wyraźniej dla dziecka
  uttr.pitch = 1.1; // Nieco wyższy głos, bardziej przyjazny
  window.speechSynthesis.speak(uttr);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
