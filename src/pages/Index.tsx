
import { useState, useRef, useCallback } from 'react';
import { Upload, Download, Sparkles, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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

    // Process the image
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-500 relative overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-30 bg-noise"></div>
      
      {/* Floating orbs for extra visual interest */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-orange-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              AI Background Remover
            </h1>
          </div>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
            Remove backgrounds from your images instantly using advanced AI technology. 
            No registration required, completely free.
          </p>
        </div>

        {/* Upload Area */}
        {!originalImage && (
          <Card className="max-w-2xl mx-auto p-12 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-orange-400 bg-orange-400/10' 
                  : 'border-white/30 hover:border-white/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-16 h-16 text-white/60 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                {dragActive ? 'Drop your image here' : 'Upload your image'}
              </h3>
              <p className="text-white/70 mb-6">
                Drag and drop your image or click to browse
              </p>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 px-8 py-3 text-lg"
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
              <p className="text-sm text-white/50 mt-4">
                Supports JPG, PNG, and other common formats
              </p>
            </div>
          </Card>
        )}

        {/* Image Processing Area */}
        {originalImage && (
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Original Image */}
              <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="w-5 h-5 text-white" />
                  <h3 className="text-lg font-semibold text-white">Original</h3>
                </div>
                <div className="aspect-square bg-white/5 rounded-lg overflow-hidden">
                  <img 
                    src={originalImage} 
                    alt="Original" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </Card>

              {/* Processed Image */}
              <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-orange-400" />
                  <h3 className="text-lg font-semibold text-white">Background Removed</h3>
                </div>
                <div className="aspect-square bg-white/5 rounded-lg overflow-hidden relative">
                  {isProcessing ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-orange-400/30 border-t-orange-400 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white/70">Processing...</p>
                      </div>
                    </div>
                  ) : processedImage ? (
                    <img 
                      src={processedImage} 
                      alt="Processed" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white/50">
                      Processing will appear here
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                onClick={() => {
                  setOriginalImage(null);
                  setProcessedImage(null);
                }}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Upload New Image
              </Button>
              {processedImage && (
                <Button
                  onClick={downloadImage}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Result
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI-Powered</h3>
            <p className="text-white/70">Advanced machine learning for precise background removal</p>
          </Card>
          
          <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Instant Results</h3>
            <p className="text-white/70">Get your processed image in seconds, not minutes</p>
          </Card>
          
          <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Free to Use</h3>
            <p className="text-white/70">No watermarks, no registration, completely free</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
