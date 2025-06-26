
import { useState } from 'react';
import { Download, Settings, Palette, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface DownloadOptionsProps {
  processedImage: string;
}

const DownloadOptions = ({ processedImage }: DownloadOptionsProps) => {
  const [format, setFormat] = useState('png');
  const [size, setSize] = useState('original');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const downloadImage = async () => {
    if (!processedImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Set canvas size based on selection
      let width = img.width;
      let height = img.height;
      
      if (size === 'social') {
        const aspectRatio = width / height;
        width = 1080;
        height = Math.round(width / aspectRatio);
      } else if (size === 'thumbnail') {
        const aspectRatio = width / height;
        width = 400;
        height = Math.round(width / aspectRatio);
      }
      
      canvas.width = width;
      canvas.height = height;
      
      if (!ctx) return;
      
      // Add background color for JPG
      if (format === 'jpg') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // Download
      const quality = format === 'jpg' ? 0.9 : 1.0;
      const mimeType = format === 'jpg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
      
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `background-removed.${format}`;
          link.click();
        }
      }, mimeType, quality);
    };
    
    img.src = processedImage;
  };

  const backgroundColors = [
    { name: 'White', value: '#ffffff' },
    { name: 'Black', value: '#000000' },
    { name: 'Transparent', value: 'transparent' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Purple', value: '#8b5cf6' },
  ];

  return (
    <Card className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
            <Download className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white">Download Options</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Preview */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Preview</h4>
            <div className="aspect-square bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 relative">
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: format === 'jpg' ? backgroundColor : 'transparent',
                  backgroundImage: format !== 'jpg' ? 'linear-gradient(45deg, #374151 25%, transparent 25%), linear-gradient(-45deg, #374151 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #374151 75%), linear-gradient(-45deg, transparent 75%, #374151 75%)' : 'none',
                  backgroundSize: format !== 'jpg' ? '20px 20px' : 'auto',
                  backgroundPosition: format !== 'jpg' ? '0 0, 0 10px, 10px -10px, -10px 0px' : 'auto'
                }}
              />
              <img 
                src={processedImage} 
                alt="Preview" 
                className="relative w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-3 block">Format</label>
              <RadioGroup value={format} onValueChange={setFormat} className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="png" id="png" />
                  <label htmlFor="png" className="text-sm text-gray-300">PNG</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="jpg" id="jpg" />
                  <label htmlFor="jpg" className="text-sm text-gray-300">JPG</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="webp" id="webp" />
                  <label htmlFor="webp" className="text-sm text-gray-300">WebP</label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-3 block">Size</label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="original">Original Size</SelectItem>
                  <SelectItem value="social">Social Media (1080px)</SelectItem>
                  <SelectItem value="thumbnail">Thumbnail (400px)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {format === 'jpg' && (
              <div>
                <label className="text-sm font-medium text-gray-300 mb-3 block">Background Color</label>
                <div className="grid grid-cols-3 gap-3">
                  {backgroundColors.filter(c => c.value !== 'transparent').map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setBackgroundColor(color.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        backgroundColor === color.value
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div 
                        className="w-full h-8 rounded mb-2"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-xs text-gray-300">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={downloadImage}
              size="lg"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Image
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DownloadOptions;
