import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

function ApprovedPage() {
  useEffect(() => {
    const audio = new Audio('/Approved.mp3');
    audio.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  }, []);

  return (
    <div className="min-h-screen bg-green-500 flex items-center justify-center p-4 sm:p-6">
      <div className="text-center">
        <CheckCircle className="w-24 h-24 sm:w-32 sm:h-32 text-white mx-auto mb-6 sm:mb-8" strokeWidth={2} />
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white">
          APPROVED
        </h1>
      </div>
    </div>
  );
}

export default ApprovedPage;
