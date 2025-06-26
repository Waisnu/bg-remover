
import { useState, useRef, useCallback } from 'react';
import { Upload, Download, Sparkles, ArrowRight, Image as ImageIcon, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { removeBackground, loadImage } from '@/lib/backgroundRemover';

const Index = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file');
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setOriginalImage(imageUrl);
    setProcessedImage(null);

    setIsProcessing(true);
    try {
      toast.info('Processing your image... This may take a moment');
      const imageElement = await loadImage(file);
      const resultBlob = await removeBackground(imageElement);
      const resultUrl = URL.createObjectURL(resultBlob);
      setProcessedImage(resultUrl);
      toast.success('Background removed successfully!');
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to remove background. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'background-removed.png';
    link.click();
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
            Professional AI-powered background removal for your images. 
            Experience precision, speed, and elegance in every edit.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Zap className="w-3 h-3 mr-1" />
              Instant Processing
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
              No Registration
            </Badge>
          </div>
        </div>

        {/* Upload Area */}
        {!originalImage && (
          <Card className="max-w-3xl mx-auto bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl">
            <CardContent className="p-12">
              <div
                className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-purple-400 bg-purple-400/10 scale-105' 
                    : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/30'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="mb-8">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-semibold text-white mb-4">
                    {dragActive ? 'Drop your image here' : 'Upload your image'}
                  </h3>
                  <p className="text-gray-400 text-lg mb-8">
                    Drag and drop your image or click to browse
                  </p>
                </div>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-12 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Choose Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-6">
                  Supports JPG, PNG, WebP and other common formats
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Processing Area */}
        {originalImage && (
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Original Image */}
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

              {/* Processed Image */}
              <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Background Removed</h3>
                  </div>
                  <div className="aspect-square bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 relative">
                    {isProcessing ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
                          <p className="text-gray-300 text-lg">Processing your image...</p>
                          <p className="text-gray-500 text-sm mt-2">This may take a moment</p>
                        </div>
                      </div>
                    ) : processedImage ? (
                      <img 
                        src={processedImage} 
                        alt="Processed" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ArrowRight className="w-6 h-6" />
                          </div>
                          <p>Processed image will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 mt-12">
              <Button
                onClick={() => {
                  setOriginalImage(null);
                  setProcessedImage(null);
                }}
                variant="outline"
                size="lg"
                className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:text-white px-8 py-3 rounded-xl"
              >
                Upload New Image
              </Button>
              {processedImage && (
                <Button
                  onClick={downloadImage}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Result
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Precision</h3>
              <p className="text-gray-400 leading-relaxed">Advanced machine learning algorithms ensure pixel-perfect background removal with professional quality results.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-400 leading-relaxed">Get your processed images in seconds, not minutes. Optimized for speed without compromising quality.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Completely Free</h3>
              <p className="text-gray-400 leading-relaxed">No watermarks, no registration, no hidden fees. Professional-grade background removal, absolutely free.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
