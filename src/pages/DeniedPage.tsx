import { useEffect } from 'react';
import { XCircle } from 'lucide-react';

function DeniedPage() {
  useEffect(() => {
    const audio = new Audio('/Denied.mp3');
    audio.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  }, []);

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-4 sm:p-6">
      <div className="text-center">
        <XCircle className="w-24 h-24 sm:w-32 sm:h-32 text-white mx-auto mb-6 sm:mb-8" strokeWidth={2} />
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white">
          DENIED
        </h1>
      </div>
    </div>
  );
}

export default DeniedPage;
