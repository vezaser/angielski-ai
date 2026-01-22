
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Always use process.env.API_KEY directly when initializing the GoogleGenAI client instance
export const getGeminiInstance = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export async function fetchCategoryWords(categoryName: string): Promise<{ english: string; polish: string }[]> {
  const ai = getGeminiInstance();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 20 basic A1 level English words related to '${categoryName}' with their Polish translations.`,
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

    // The GenerateContentResponse features a text property (not a method)
    const text = response.text;
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("Error fetching words:", error);
    return [];
  }
}

export async function playPronunciation(text: string) {
  const ai = getGeminiInstance();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say clearly: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    // Extract raw PCM audio data from the response part
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const decodedData = decode(base64Audio);
      const audioBuffer = await decodeAudioData(decodedData, audioCtx, 24000, 1);
      
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();
    }
  } catch (error) {
    console.error("Error playing audio:", error);
  }
}

// Manual base64 decoding implementation following SDK guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Custom decoding logic for raw PCM data streams returned by Gemini
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
