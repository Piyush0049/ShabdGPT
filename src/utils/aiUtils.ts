import { GoogleGenAI } from "@google/genai";
import { fallbackResponses } from "../constants/shabdgpt";

export const calculateSimilarity = (str1: string, str2: string): number => {
  const words1 = str1.split(' ');
  const words2 = str2.split(' ');
  
  let matches = 0;
  for (const word1 of words1) {
    if (words2.some(word2 => word2.includes(word1) || word1.includes(word2))) {
      matches++;
    }
  }
  
  return matches / Math.max(words1.length, words2.length);
};

export async function fetchAIResponse(userQuery: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });

    const prompt = `You are a helpful Hindi language learning assistant. Provide concise responses (under 100 words). When appropriate, include both Hindi text and English translations. Focus on helping users learn Hindi vocabulary, grammar, and cultural aspects.\n\n${userQuery}`;

    // Call the Gemini API using the GoogleGenAI library
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // or update to the model you intend to use
      contents: prompt,
    });

    // Return the response text from Gemini
    return response.text;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    
    // Return a random fallback response
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
}