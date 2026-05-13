import { GoogleGenAI, Type } from "@google/genai";
import { ExpenseInput } from "../types";

let ai: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    ai = new GoogleGenAI({ apiKey: key });
  }
  return ai;
}

export async function parseExpensesFromText(text: string): Promise<ExpenseInput[]> {
  const client = getGeminiClient();
  
  const response = await client.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Translate the following text to transactions (incomes or expenses). Analyze the text in whatever language it is (e.g. Uzbek, English), and extract the data. 
Text: "${text}"`,
    config: {
      systemInstruction: "You are a specialized financial assistant. Your job is to extract financial transactions (both incomes and expenses) from natural language text. Return an array of transactions. Map the category to one of the following if possible: Salary, Business, Gift, Food, Transport, Shopping, Entertainment, Bills, Health, Education, Other.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            description: {
              type: Type.STRING,
              description: "A short, concise description of the transaction in English or the original language."
            },
            category: {
              type: Type.STRING,
              description: "The category of the transaction. E.g., Salary, Food, Transport, Shopping, etc."
            },
            amount: {
              type: Type.NUMBER,
              description: "The numerical value of the transaction. Always absolute (positive) number."
            },
            currency: {
              type: Type.STRING,
              description: "The 3-letter currency code, e.g. UZS, USD, RUB. Default to UZS if not specified."
            },
            type: {
              type: Type.STRING,
              description: "'income' if money is received/earned, 'expense' if money is spent."
            }
          },
          required: ["description", "category", "amount", "currency", "type"]
        }
      }
    }
  });

  const responseText = response.text;
  if (!responseText) {
    throw new Error("No response from Gemini");
  }

  try {
    const data = JSON.parse(responseText.trim());
    return data as ExpenseInput[];
  } catch (error) {
    console.error("Failed to parse JSON response:", responseText);
    throw new Error("Invalid response format from Gemini");
  }
}
