
import { useState, useCallback } from 'react';
import { Sparkles, Zap, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { removeBackground, loadImage } from '@/lib/backgroundRemover';
import { apiKeyManager } from '@/lib/apiKeyManager';
import UploadArea from '@/components/UploadArea';
import ProcessingStatus from '@/components/ProcessingStatus';
import ImageComparison from '@/components/ImageComparison';
import DownloadOptions from '@/components/DownloadOptions';
import ApiUsageStats from '@/components/ApiUsageStats';

const Index = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setOriginalImage(imageUrl);
    setProcessedImage(null);
    setError(null);

    setIsProcessing(true);
    try {
      toast.info('Processing your image with professional AI...');
      const resultBlob = await removeBackground(file);
      const resultUrl = URL.createObjectURL(resultBlob);
      setProcessedImage(resultUrl);
      toast.success('Background removed successfully!');
    } catch (error) {
      console.error('Error processing image:', error);
      let errorMessage = 'Failed to remove background. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
      
      // If it's a quota error, try again with next key
      if (errorMessage.includes('quota') || errorMessage.includes('Switching')) {
        toast.info('Trying with different API key...');
        setTimeout(() => handleFileSelect(file), 1000);
        return;
      }
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 bg-aurora opacity-70"></div>
      
      {/* Animated Aurora Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-pink-500/30 to-orange-500/30 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              AI Background Remover
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Professional AI-powered background removal using Remove.bg API. 
            Experience precision, speed, and elegance with smart API rotation.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Zap className="w-3 h-3 mr-1" />
              Remove.bg API
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Smart Rotation
            </Badge>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
              <BarChart3 className="w-3 h-3 mr-1" />
              5x Capacity
            </Badge>
          </div>
        </div>

        {/* API Usage Stats */}
        <ApiUsageStats />

        {/* Main Content Area */}
        <div className="space-y-12">
          {/* Upload Area - Show when no image is selected */}
          {!originalImage && (
            <UploadArea onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          )}

          {/* Processing Status - Show when processing */}
          <ProcessingStatus 
            isProcessing={isProcessing} 
            error={error}
          />

          {/* Image Comparison - Show when images are ready */}
          {originalImage && processedImage && !isProcessing && (
            <ImageComparison
              originalImage={originalImage}
              processedImage={processedImage}
              onReset={handleReset}
            />
          )}

          {/* Download Options - Show when processing is complete */}
          {processedImage && !isProcessing && (
            <DownloadOptions processedImage={processedImage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
