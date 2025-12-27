/// <reference types="vite/client" />
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const getStylistRecommendation = async (
  query: string,
  inventory: Product[]
): Promise<{ recommendationText: string; recommendedProductId?: string }> => {
  if (!apiKey) {
    return {
      recommendationText:
        "I'm currently offline (API Key missing). Please browse our collection manually!",
    };
  }

  try {
    const inventoryContext = JSON.stringify(
      inventory.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        description: p.description,
        tags: p.tags,
        price: p.price,
      }))
    );

    const model = "gemini-3-flash-preview";

    const response = await ai.models.generateContent({
      model: model,
      contents: `User Query: "${query}"
      
      Inventory: ${inventoryContext}
      
      You are Eimigo's Intelligent Assistant. 
      
      **About EIMIGO:**
      - **Brand Identity:** Future Footwear. Born in the North East of India, built for the world. Where culture meets creation.
      - **Mission:** To become the leading footwear brand from the North East, prioritizing quality, style, and cultural identity.
      - **Philosophy:** "Not just a shoe. A machine for walking." We strip back the unnecessary. No fake panels, just raw, functional design powered by data.
      - **Founder:** Kapthianmuan Ngaihte - A visionary leader passionate about bringing North East culture to the global stage.
      - **Head of Design:** Sonmuan - Specializes in cultural themes and modern aesthetics.
      - **Key Values:** Authenticity, quality, boldness, resilience, and pride.
      
      **Role & Guidelines:**
      1.  **Expert Knowledge:** You know everything about our products (prices, stories, materials) and our brand story. Use the inventory data provided.
      2.  **Style Advice:** Recommend shoes based on the user's vibe, occasion, or specific needs.
      3.  **Tone:** Cool, confident, modern, and helpful. Not robotic.
      4.  **Brand Voice:** Emphasize "Born in North East", "Global Standards", and "Authenticity".
      5.  **Concise:** Keep responses punchy and easy to read.
      6.  **Scope Enforcement:** You ONLY answer questions related to Eimigo, our products, footwear, style, and fashion. If the user asks about anything else (e.g., general knowledge, math, coding, politics, weather), politely refuse and steer them back to Eimigo.
      
      **Task:**
      Analyze the user's request. If it is unrelated to Eimigo/fashion, politely refuse. If related, match them to the best shoe, tell them our story, or give style advice.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendationText: {
              type: Type.STRING,
              description: "The response to the user.",
            },
            recommendedProductId: {
              type: Type.STRING,
              description:
                "The ID of the recommended or discussed product from the inventory, or null if general conversation.",
              nullable: true,
            },
          },
          required: ["recommendationText"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Stylist Error:", error);
    return {
      recommendationText:
        "I'm having trouble connecting to the fashion mainframe. Try again in a moment.",
    };
  }
};
