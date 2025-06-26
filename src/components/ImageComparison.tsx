
import { useState } from 'react';
import { Image as ImageIcon, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ImageComparisonProps {
  originalImage: string;
  processedImage: string;
  onReset: () => void;
}

const ImageComparison = ({ originalImage, processedImage, onReset }: ImageComparisonProps) => {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Toggle View */}
      <div className="flex justify-center">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-2">
          <div className="flex gap-2">
            <Button
              onClick={() => setShowComparison(false)}
              variant={!showComparison ? "default" : "ghost"}
              className={`px-6 py-2 rounded-xl transition-all ${
                !showComparison 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Side by Side
            </Button>
            <Button
              onClick={() => setShowComparison(true)}
              variant={showComparison ? "default" : "ghost"}
              className={`px-6 py-2 rounded-xl transition-all ${
                showComparison 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Before/After
            </Button>
          </div>
        </div>
      </div>

      {!showComparison ? (
        /* Side by Side View */
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <ImageIcon className="w-6 h-6 text-gray-300" />
                <h3 className="text-xl font-semibold text-white">Original Image</h3>
              </div>
              <div className="aspect-square bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50">
                <img 
                  src={originalImage} 
                  alt="Original" 
                  className="w-full h-full object-contain"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Background Removed</h3>
              </div>
              <div className="aspect-square bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 relative">
                <div 
                  className="absolute inset-0"
                  style={{ 
                    backgroundImage: 'linear-gradient(45deg, #374151 25%, transparent 25%), linear-gradient(-45deg, #374151 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #374151 75%), linear-gradient(-45deg, transparent 75%, #374151 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                  }}
                />
                <img 
                  src={processedImage} 
                  alt="Processed" 
                  className="relative w-full h-full object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Before/After Slider View */
        <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-gray-300" />
                <span className="text-lg font-medium text-white">Before</span>
              </div>
              <ArrowRight className="w-6 h-6 text-purple-400" />
              <div className="flex items-center gap-2">
                <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-medium text-white">After</span>
              </div>
            </div>
            
            <div className="relative aspect-video bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50">
              <div className="grid grid-cols-2 h-full">
                <div className="relative">
                  <img 
                    src={originalImage} 
                    alt="Original" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-white text-sm font-medium">Original</span>
                  </div>
                </div>
                <div className="relative">
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      backgroundImage: 'linear-gradient(45deg, #374151 25%, transparent 25%), linear-gradient(-45deg, #374151 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #374151 75%), linear-gradient(-45deg, transparent 75%, #374151 75%)',
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                    }}
                  />
                  <img 
                    src={processedImage} 
                    alt="Processed" 
                    className="relative w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-white text-sm font-medium">AI Processed</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/20 transform -translate-x-0.5"></div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Button */}
      <div className="flex justify-center">
        <Button
          onClick={onReset}
          variant="outline"
          size="lg"
          className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:text-white px-8 py-3 rounded-xl"
        >
          Process New Image
        </Button>
      </div>
    </div>
  );
};

export default ImageComparison;
