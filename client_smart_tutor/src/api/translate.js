import axios from 'axios';

export async function translateText(text, targetLang = 'en') {
  const response = await axios.post('https://libretranslate.de/translate', {
    q: text,
    source: 'auto',
    target: targetLang,
    format: 'text',
  });
  return response.data.translatedText;
} 