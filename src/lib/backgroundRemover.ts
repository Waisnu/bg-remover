
import { apiKeyManager } from './apiKeyManager';

export const removeBackground = async (imageFile: File): Promise<Blob> => {
  try {
    console.log('Starting background removal with remove.bg API...');
    
    const apiKey = apiKeyManager.getNextApiKey();
    if (!apiKey) {
      throw new Error('All API keys have reached their monthly limit. Please wait or add more API keys.');
    }

    console.log('Using API key:', apiKey.substring(0, 8) + '...');
    
    const formData = new FormData();
    formData.append('image_file', imageFile);
    formData.append('size', 'auto');
    
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('remove.bg API error:', response.status, errorText);
      
      if (response.status === 402) {
        apiKeyManager.recordError();
        throw new Error('API key quota exceeded. Switching to next key...');
      }
      
      if (response.status === 400) {
        throw new Error('Invalid image format. Please use JPG, PNG, or WebP images.');
      }
      
      if (response.status === 403) {
        apiKeyManager.recordError();
        throw new Error('API key is invalid or suspended.');
      }
      
      throw new Error(`Background removal failed: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    apiKeyManager.recordUsage();
    
    console.log('Background removal successful');
    return blob;
    
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

export const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};
