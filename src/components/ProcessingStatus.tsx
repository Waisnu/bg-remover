
import { useState, useEffect } from 'react';
import { Sparkles, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProcessingStatusProps {
  isProcessing: boolean;
  error?: string | null;
  onComplete?: () => void;
}

const ProcessingStatus = ({ isProcessing, error, onComplete }: ProcessingStatusProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    if (!isProcessing) {
      setProgress(0);
      return;
    }

    const steps = [
      { text: 'Selecting optimal API key...', duration: 800 },
      { text: 'Uploading image to Remove.bg...', duration: 1500 },
      { text: 'AI analyzing image composition...', duration: 2000 },
      { text: 'Processing background removal...', duration: 2500 },
      { text: 'Downloading processed image...', duration: 1200 }
    ];

    let currentStep = 0;
    let currentProgress = 0;

    const updateStatus = () => {
      if (currentStep < steps.length) {
        setStatus(steps[currentStep].text);
        const targetProgress = ((currentStep + 1) / steps.length) * 100;
        
        const progressInterval = setInterval(() => {
          currentProgress += 3;
          setProgress(Math.min(currentProgress, targetProgress));
          
          if (currentProgress >= targetProgress) {
            clearInterval(progressInterval);
            currentStep++;
            setTimeout(updateStatus, 100);
          }
        }, 40);
      } else {
        setProgress(100);
        setStatus('Complete!');
        setTimeout(() => onComplete?.(), 500);
      }
    };

    updateStatus();
  }, [isProcessing, onComplete]);

  if (!isProcessing && !error) return null;

  return (
    <Card className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl">
      <CardContent className="p-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            {error ? (
              <AlertCircle className="w-8 h-8 text-red-500" />
            ) : isProcessing ? (
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            ) : (
              <CheckCircle className="w-8 h-8 text-green-500" />
            )}
            <h3 className="text-2xl font-semibold text-white">
              {error ? 'Processing Failed' : isProcessing ? 'Processing with Remove.bg' : 'Complete'}
            </h3>
          </div>
          
          {error ? (
            <div className="space-y-3">
              <p className="text-red-400 mb-4">{error}</p>
              {error.includes('quota') && (
                <p className="text-sm text-yellow-400">
                  💡 Don't worry! We're automatically switching to the next API key.
                </p>
              )}
            </div>
          ) : (
            <>
              <p className="text-gray-300 mb-6">{status}</p>
              <div className="space-y-4">
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-gray-500">{Math.round(progress)}% complete</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingStatus;
