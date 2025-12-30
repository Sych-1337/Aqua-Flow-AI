
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getHydrationAdvice(profile: UserProfile, currentIntake: number, goal: number) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User Profile: Name: ${profile.name}, Weight: ${profile.weight}kg, Activity: ${profile.activityLevel}. Intake: ${currentIntake}ml, Goal: ${goal}ml. Provide 3 hydration tips/activities. JSON array: {title, description}.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ['title', 'description']
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return [{ title: "Stay Hydrated", description: "Water is vital for your health." }];
  }
}

export async function getSportsNews() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate 4 short blog posts about sports nutrition and healthy hydration. Include title, category, and a short summary. Format: JSON array.",
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              category: { type: Type.STRING },
              summary: { type: Type.STRING },
              date: { type: Type.STRING }
            },
            required: ['title', 'category', 'summary', 'date']
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return [];
  }
}
