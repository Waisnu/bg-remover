
interface ApiKeyConfig {
  key: string;
  usageCount: number;
  lastReset: Date;
  isActive: boolean;
}

class ApiKeyManager {
  private apiKeys: ApiKeyConfig[] = [
    { key: '9ZeRncTRVXRDmJM1icuHcxg9', usageCount: 0, lastReset: new Date(), isActive: true },
    // Add more API keys here as you create them
    // { key: 'YOUR_SECOND_API_KEY', usageCount: 0, lastReset: new Date(), isActive: true },
    // { key: 'YOUR_THIRD_API_KEY', usageCount: 0, lastReset: new Date(), isActive: true },
    // { key: 'YOUR_FOURTH_API_KEY', usageCount: 0, lastReset: new Date(), isActive: true },
    // { key: 'YOUR_FIFTH_API_KEY', usageCount: 0, lastReset: new Date(), isActive: true },
  ];
  
  private currentKeyIndex = 0;
  private readonly MAX_USAGE_PER_KEY = 50;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem('apiKeyUsage');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        // Merge stored data with API keys, preserving usage counts
        this.apiKeys.forEach((key, index) => {
          if (data[index]) {
            key.usageCount = data[index].usageCount || 0;
            key.lastReset = new Date(data[index].lastReset || Date.now());
            key.isActive = data[index].isActive !== undefined ? data[index].isActive : true;
          }
        });
      } catch (error) {
        console.warn('Failed to load API key usage from storage:', error);
      }
    }
  }

  private saveToStorage(): void {
    const data = this.apiKeys.map(key => ({
      usageCount: key.usageCount,
      lastReset: key.lastReset.toISOString(),
      isActive: key.isActive
    }));
    localStorage.setItem('apiKeyUsage', JSON.stringify(data));
  }

  private resetMonthlyUsage(): void {
    const now = new Date();
    this.apiKeys.forEach(key => {
      const daysSinceReset = Math.floor((now.getTime() - key.lastReset.getTime()) / (1000 * 60 * 60 * 24));
      if (daysSinceReset >= 30) {
        key.usageCount = 0;
        key.lastReset = now;
        key.isActive = true;
      }
    });
  }

  public getNextApiKey(): string | null {
    this.resetMonthlyUsage();
    
    // Find an available API key
    for (let i = 0; i < this.apiKeys.length; i++) {
      const keyIndex = (this.currentKeyIndex + i) % this.apiKeys.length;
      const apiKey = this.apiKeys[keyIndex];
      
      if (apiKey.isActive && apiKey.usageCount < this.MAX_USAGE_PER_KEY) {
        this.currentKeyIndex = keyIndex;
        return apiKey.key;
      }
    }
    
    return null; // All keys exhausted
  }

  public recordUsage(): void {
    const currentKey = this.apiKeys[this.currentKeyIndex];
    if (currentKey) {
      currentKey.usageCount++;
      if (currentKey.usageCount >= this.MAX_USAGE_PER_KEY) {
        currentKey.isActive = false;
      }
      this.saveToStorage();
    }
  }

  public recordError(): void {
    const currentKey = this.apiKeys[this.currentKeyIndex];
    if (currentKey) {
      currentKey.isActive = false;
      this.saveToStorage();
    }
  }

  public getUsageStats(): { total: number; available: number; keys: Array<{key: string, usage: number, active: boolean}> } {
    const keys = this.apiKeys.map(key => ({
      key: key.key.substring(0, 8) + '...',
      usage: key.usageCount,
      active: key.isActive
    }));
    
    return {
      total: this.apiKeys.reduce((sum, key) => sum + key.usageCount, 0),
      available: this.apiKeys.filter(key => key.isActive && key.usageCount < this.MAX_USAGE_PER_KEY).length,
      keys
    };
  }
}

export const apiKeyManager = new ApiKeyManager();
