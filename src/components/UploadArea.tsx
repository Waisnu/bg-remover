
import { useState, useRef, useCallback } from 'react';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

const UploadArea = ({ onFileSelect, isProcessing }: UploadAreaProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    onFileSelect(file);
  }, [onFileSelect]);

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

  const resetUploadArea = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (preview) {
    return (
      <Card className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">Selected Image</h3>
          </div>
          <div className="aspect-video bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 mb-6">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex gap-4">
            <Button
              onClick={resetUploadArea}
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:text-white flex-1"
              disabled={isProcessing}
            >
              Choose Different Image
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl">
      <CardContent className="p-12">
        <div
          className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-purple-400 bg-purple-400/10 scale-105 glow-purple' 
              : 'border-gray-700 hover:border-purple-500/50 hover:bg-gray-800/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mb-8">
            <div className={`mx-auto w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${dragActive ? 'scale-110' : ''}`}>
              <Upload className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-semibold text-white mb-4">
              {dragActive ? 'Drop your image here' : 'Upload your image'}
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              Drag and drop your image or click to browse
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <AlertCircle className="w-4 h-4" />
                Max 10MB
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="text-sm text-gray-500">JPG, PNG, WebP</div>
            </div>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadArea;
