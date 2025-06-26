
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Zap, 
  Brain, 
  Shield, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Target,
  Layers,
  BarChart3,
  Eye
} from 'lucide-react';

const SystemDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Smart API Orchestration Dashboard
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Real-time visibility into intelligent background removal API management, 
            resource optimization, and system performance analytics
          </p>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-900/50 backdrop-blur-xl border border-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">System Overview</TabsTrigger>
            <TabsTrigger value="orchestration" className="data-[state=active]:bg-blue-600">API Orchestration</TabsTrigger>
            <TabsTrigger value="intelligence" className="data-[state=active]:bg-green-600">Intelligence Engine</TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-orange-600">Performance Metrics</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-pink-600">Predictive Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <SystemOverview />
          </TabsContent>
          
          <TabsContent value="orchestration">
            <ApiOrchestration />
          </TabsContent>
          
          <TabsContent value="intelligence">
            <IntelligenceEngine />
          </TabsContent>
          
          <TabsContent value="performance">
            <PerformanceMetrics />
          </TabsContent>
          
          <TabsContent value="analytics">
            <PredictiveAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// System Overview Component
const SystemOverview = () => {
  const systemStats = {
    totalRequests: 12847,
    successRate: 99.2,
    avgResponseTime: 1.8,
    costSavings: 2847.50,
    activeProviders: 5,
    healthyAccounts: 23
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Real-time System Health */}
      <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800 col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="w-5 h-5 text-green-500" />
            System Health Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">{systemStats.totalRequests.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Requests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">{systemStats.successRate}%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">{systemStats.avgResponseTime}s</div>
              <div className="text-sm text-gray-400">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-1">${systemStats.costSavings}</div>
              <div className="text-sm text-gray-400">Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-1">{systemStats.activeProviders}</div>
              <div className="text-sm text-gray-400">API Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-1">{systemStats.healthyAccounts}</div>
              <div className="text-sm text-gray-400">Healthy Accounts</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Processing Queue */}
      <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Clock className="w-5 h-5 text-orange-500" />
            Live Processing Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 'IMG_001', complexity: 7, provider: 'Remove.bg', status: 'processing', eta: '2s' },
              { id: 'IMG_002', complexity: 4, provider: 'Clipdrop', status: 'queued', eta: '8s' },
              { id: 'IMG_003', complexity: 9, provider: 'Adobe PS', status: 'analyzing', eta: '15s' }
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant={item.status === 'processing' ? 'default' : 'secondary'} className="text-xs">
                    {item.status}
                  </Badge>
                  <span className="text-sm text-gray-300">{item.id}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Complexity: {item.complexity}/10</span>
                  <span>•</span>
                  <span>{item.provider}</span>
                  <span>•</span>
                  <span>ETA: {item.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Utilization */}
      <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Target className="w-5 h-5 text-purple-500" />
            Resource Utilization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">Premium API Quota</span>
              <span className="text-gray-400">127/250 (51%)</span>
            </div>
            <Progress value={51} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">Processing Capacity</span>
              <span className="text-gray-400">78/100 (78%)</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">Cache Hit Rate</span>
              <span className="text-gray-400">89%</span>
            </div>
            <Progress value={89} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="w-5 h-5 text-red-500" />
            System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <div className="flex-1">
                <div className="text-sm text-yellow-400 font-medium">Quota Warning</div>
                <div className="text-xs text-gray-400">Remove.bg Account #3 at 90% usage</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <div className="flex-1">
                <div className="text-sm text-green-400 font-medium">Recovery Complete</div>
                <div className="text-xs text-gray-400">Adobe API Account #1 back online</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// API Orchestration Component
const ApiOrchestration = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Provider Status Board */}
      <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800 col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Layers className="w-5 h-5 text-blue-500" />
            Multi-Tier API Provider Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Tier 1 - Premium APIs */}
            <div>
              <h4 className="text-lg font-semibold text-purple-400 mb-3">Tier 1 - Premium APIs</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Remove.bg', accounts: 5, totalQuota: 250, used: 127, avgResponse: 1.2, quality: 98 },
                  { name: 'PhotoRoom', accounts: 5, totalQuota: 250, used: 89, avgResponse: 1.8, quality: 96 },
                  { name: 'Adobe PS', accounts: 2, totalQuota: 200, used: 156, avgResponse: 2.1, quality: 99 }
                ].map((provider) => (
                  <div key={provider.name} className="p-4 bg-gray-800/50 rounded-lg border border-purple-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-white">{provider.name}</h5>
                      <Badge variant="default" className="bg-purple-600">Premium</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Accounts</span>
                        <span className="text-white">{provider.accounts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Usage</span>
                        <span className="text-white">{provider.used}/{provider.totalQuota}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response Time</span>
                        <span className="text-white">{provider.avgResponse}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Quality Score</span>
                        <span className="text-white">{provider.quality}%</span>
                      </div>
                      <Progress value={(provider.used / provider.totalQuota) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tier 2 - Alternative APIs */}
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-3">Tier 2 - Alternative APIs</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Clipdrop', accounts: 3, totalQuota: 600, used: 234, avgResponse: 2.8, quality: 92 },
                  { name: 'Pixian', accounts: 4, totalQuota: 400, used: 178, avgResponse: 3.2, quality: 88 },
                  { name: 'BG Remover', accounts: 2, totalQuota: 300, used: 89, avgResponse: 4.1, quality: 85 }
                ].map((provider) => (
                  <div key={provider.name} className="p-4 bg-gray-800/50 rounded-lg border border-blue-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-white">{provider.name}</h5>
                      <Badge variant="secondary" className="bg-blue-600">Standard</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Accounts</span>
                        <span className="text-white">{provider.accounts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Usage</span>
                        <span className="text-white">{provider.used}/{provider.totalQuota}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response Time</span>
                        <span className="text-white">{provider.avgResponse}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Quality Score</span>
                        <span className="text-white">{provider.quality}%</span>
                      </div>
                      <Progress value={(provider.used / provider.totalQuota) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Intelligence Engine Component  
const IntelligenceEngine = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Image Complexity Analysis */}
      <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Brain className="w-5 h-5 text-green-500" />
            Image Complexity Analysis Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-medium text-white mb-3">Current Analysis Pipeline</h4>
              <div className="space-y-3">
                {[
                  { factor: 'Edge Detection Density', weight: 25, current: 87 },
                  { factor: 'Color Contrast Ratio', weight: 20, current: 76 },
                  { factor: 'Subject Count', weight: 15, current: 45 },
                  { factor: 'Background Complexity', weight: 25, current: 92 },
                  { factor: 'Image Resolution', weight: 15, current: 68 }
                ].map((factor) => (
                  <div key={factor.factor}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{factor.factor}</span>
                      <span className="text-gray-400">{factor.current}% (Weight: {factor.weight}%)</span>
                    </div>
                    <Progress value={factor.current} className="h-2" />
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="text-sm">
                  <span className="text-green-400 font-medium">Complexity Score: 8.2/10</span>
                  <span className="text-gray-400 ml-2">→ Routing to Premium API (Remove.bg)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Routing Decisions */}
      <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Target className="w-5 h-5 text-purple-500" />
            Smart Routing Decisions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                id: 'IMG_847', 
                complexity: 3.2, 
                route: 'Client-side TensorFlow', 
                reason: 'Simple background, high contrast',
                savings: '$0.05'
              },
              { 
                id: 'IMG_848', 
                complexity: 6.7, 
                route: 'Clipdrop API', 
                reason: 'Medium complexity, quota available',
                savings: '$0.03'
              },
              { 
                id: 'IMG_849', 
                complexity: 9.1, 
                route: 'Remove.bg Premium', 
                reason: 'Complex edges, quality critical',
                savings: '$0.00'
              },
              { 
                id: 'IMG_850', 
                complexity: 4.8, 
                route: 'Pixian API', 
                reason: 'Fallback - primary quota exceeded',
                savings: '$0.04'
              }
            ].map((decision) => (
              <div key={decision.id} className="p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{decision.id}</span>
                  <Badge 
                    variant={decision.complexity < 4 ? 'secondary' : decision.complexity < 7 ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {decision.complexity}/10
                  </Badge>
                </div>
                <div className="text-sm space-y-1">
                  <div className="text-blue-400">→ {decision.route}</div>
                  <div className="text-gray-400">{decision.reason}</div>
                  <div className="text-green-400">Cost savings: {decision.savings}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Performance Metrics Component
const PerformanceMetrics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Response Time Analytics */}
      <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Zap className="w-5 h-5 text-yellow-500" />
            Response Time Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-green-400">1.8s</div>
                <div className="text-sm text-gray-400">Average Response</div>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">0.9s</div>
                <div className="text-sm text-gray-400">P95 Response</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-300">Response Time by Provider</h4>
              {[
                { provider: 'Remove.bg', avgTime: 1.2, p95Time: 2.1, requests: 2847 },
                { provider: 'Clipdrop', avgTime: 2.8, p95Time: 4.2, requests: 1923 },
                { provider: 'Client-side', avgTime: 0.6, p95Time: 1.1, requests: 3421 }
              ].map((metric) => (
                <div key={metric.provider} className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{metric.provider}</span>
                    <span className="text-sm text-gray-400">{metric.requests} requests</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Avg: </span>
                      <span className="text-green-400">{metric.avgTime}s</span>
                    </div>
                    <div>
                      <span className="text-gray-400">P95: </span>
                      <span className="text-blue-400">{metric.p95Time}s</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Optimization Metrics */}
      <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Cost Optimization Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30">
              <div className="text-3xl font-bold text-green-400 mb-1">$2,847.50</div>
              <div className="text-sm text-gray-400">Total Cost Savings This Month</div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-300">Savings Breakdown</h4>
              {[
                { method: 'Smart API Routing', savings: 1240.30, percentage: 43.5 },
                { method: 'Client-side Processing', savings: 892.75, percentage: 31.3 },
                { method: 'Intelligent Caching', savings: 467.20, percentage: 16.4 },
                { method: 'Quota Optimization', savings: 247.25, percentage: 8.8 }
              ].map((saving) => (
                <div key={saving.method} className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{saving.method}</span>
                    <span className="text-green-400 font-medium">${saving.savings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={saving.percentage} className="flex-1 h-2" />
                    <span className="text-sm text-gray-400">{saving.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Predictive Analytics Component
const PredictiveAnalytics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Usage Forecasting */}
      <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            Usage Pattern Forecasting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <h4 className="font-medium text-purple-400 mb-2">Next 7 Days Prediction</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Expected Requests</span>
                  <span className="text-white">~18,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Peak Hour Load</span>
                  <span className="text-white">2:00 PM - 4:00 PM UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Quota Exhaustion Risk</span>
                  <span className="text-yellow-400">Medium (Day 5)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-300">Daily Forecast</h4>
              {[
                { day: 'Today', requests: 2847, complexity: 6.2, risk: 'Low' },
                { day: 'Tomorrow', requests: 3120, complexity: 6.8, risk: 'Low' },
                { day: 'Day 3', requests: 2650, complexity: 5.9, risk: 'Low' },
                { day: 'Day 4', requests: 3890, complexity: 7.1, risk: 'Medium' },
                { day: 'Day 5', requests: 4200, complexity: 7.8, risk: 'High' }
              ].map((forecast) => (
                <div key={forecast.day} className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{forecast.day}</span>
                    <Badge 
                      variant={forecast.risk === 'Low' ? 'secondary' : forecast.risk === 'Medium' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {forecast.risk} Risk
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                    <div>
                      <span className="text-gray-400">Requests: </span>
                      <span className="text-white">{forecast.requests}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Avg Complexity: </span>
                      <span className="text-white">{forecast.complexity}/10</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Capacity Planning */}
      <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Eye className="w-5 h-5 text-cyan-500" />
            Intelligent Capacity Planning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
              <h4 className="font-medium text-cyan-400 mb-2">Recommendations</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-gray-300">Add 2 more Remove.bg accounts before Day 5</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span className="text-gray-300">Enable burst processing for peak hours</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-gray-300">Current cache strategy is optimal</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-300">Resource Planning</h4>
              {[
                { resource: 'Premium API Accounts', current: 12, recommended: 15, impact: '+20% capacity' },
                { resource: 'Alternative API Accounts', current: 9, recommended: 9, impact: 'Sufficient' },
                { resource: 'Cache Storage', current: '2.4 GB', recommended: '3.2 GB', impact: '+15% hit rate' },
                { resource: 'Processing Threads', current: 8, recommended: 12, impact: '+25% throughput' }
              ].map((resource) => (
                <div key={resource.resource} className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{resource.resource}</span>
                    <span className="text-sm text-cyan-400">{resource.impact}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Current: </span>
                      <span className="text-white">{resource.current}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Recommended: </span>
                      <span className="text-green-400">{resource.recommended}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemDashboard;
