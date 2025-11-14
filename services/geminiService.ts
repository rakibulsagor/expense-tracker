
import { GoogleGenAI } from "@google/genai";
import { Category } from '../types';
import { CATEGORIES } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const suggestCategory = async (description: string): Promise<Category | null> => {
  if (!API_KEY) {
    console.log("Gemini API key not configured, skipping suggestion.");
    return null;
  }
  if (!description.trim()) {
    return null;
  }

  const prompt = `Based on the expense description "${description}", what is the most appropriate category?
  Please choose exactly one from the following list: ${CATEGORIES.join(', ')}.
  Respond with only the category name and nothing else.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    const text = response.text.trim();
    
    if (CATEGORIES.includes(text as Category)) {
      return text as Category;
    } else {
      console.warn(`Gemini returned an invalid category: "${text}"`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching category suggestion from Gemini:", error);
    return null;
  }
};
