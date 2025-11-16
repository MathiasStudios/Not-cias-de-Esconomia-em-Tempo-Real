
import { GoogleGenAI } from "@google/genai";
import { NewsData, GroundingChunk } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const fetchEconomicNews = async (query: string): Promise<NewsData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Resuma as notícias de economia mais recentes sobre "${query}" em um parágrafo conciso. Responda em Português do Brasil.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const summary = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] || [];
    
    if (!summary) {
      throw new Error("Não foi possível gerar um resumo das notícias.");
    }

    return { summary, sources };
  } catch (error) {
    console.error("Error fetching economic news:", error);
    if (error instanceof Error) {
        throw new Error(`Falha ao buscar notícias: ${error.message}`);
    }
    throw new Error("Ocorreu um erro desconhecido ao buscar as notícias.");
  }
};
