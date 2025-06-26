
import { useState, useEffect } from 'react';
import { BarChart3, Key, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { apiKeyManager } from '@/lib/apiKeyManager';

const ApiUsageStats = () => {
  const [stats, setStats] = useState(apiKeyManager.getUsageStats());

  useEffect(() => {
    const updateStats = () => {
      setStats(apiKeyManager.getUsageStats());
    };

    // Update stats every 5 seconds
    const interval = setInterval(updateStats, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <BarChart3 className="w-5 h-5 text-purple-500" />
          API Usage Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Requests</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">{stats.available}</div>
            <div className="text-sm text-gray-400">Active Keys</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">{stats.keys.length}</div>
            <div className="text-sm text-gray-400">Total Keys</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Key className="w-4 h-4" />
            API Key Status
          </h4>
          {stats.keys.map((key, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Activity className={`w-4 h-4 ${key.active ? 'text-green-500' : 'text-red-500'}`} />
                <span className="text-sm text-gray-300 font-mono">{key.key}</span>
                <Badge variant={key.active ? 'default' : 'destructive'} className="text-xs">
                  {key.active ? 'Active' : 'Exhausted'}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">{key.usage}/50</span>
                <Progress 
                  value={(key.usage / 50) * 100} 
                  className="w-20 h-2"
                />
              </div>
            </div>
          ))}
        </div>

        {stats.available === 0 && (
          <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-400">
              ⚠️ All API keys have reached their monthly limit. Add more keys or wait for monthly reset.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiUsageStats;
