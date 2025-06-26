
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
      { text: 'Loading AI model...', duration: 2000 },
      { text: 'Analyzing image...', duration: 1500 },
      { text: 'Detecting subjects...', duration: 2000 },
      { text: 'Removing background...', duration: 1500 },
      { text: 'Finalizing result...', duration: 1000 }
    ];

    let currentStep = 0;
    let currentProgress = 0;

    const updateStatus = () => {
      if (currentStep < steps.length) {
        setStatus(steps[currentStep].text);
        const targetProgress = ((currentStep + 1) / steps.length) * 100;
        
        const progressInterval = setInterval(() => {
          currentProgress += 2;
          setProgress(Math.min(currentProgress, targetProgress));
          
          if (currentProgress >= targetProgress) {
            clearInterval(progressInterval);
            currentStep++;
            setTimeout(updateStatus, 100);
          }
        }, 50);
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
              {error ? 'Processing Failed' : isProcessing ? 'Processing Image' : 'Complete'}
            </h3>
          </div>
          
          {error ? (
            <p className="text-red-400 mb-4">{error}</p>
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
