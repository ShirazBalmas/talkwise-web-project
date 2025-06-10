import { GoogleGenerativeAI } from '@google/generative-ai';

// Get API key from environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

console.log('Gemini API Key (from env):', API_KEY);

// Use GoogleGenerativeAI and get the model directly
const genAI = new GoogleGenerativeAI(API_KEY);
// Change model name to gemini-2.0-flash as shown in docs
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Removed temporary listAvailableModels function

export async function sendChatMessage(message) {
  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in Gemini API:', error);
    throw error;
  }
} 