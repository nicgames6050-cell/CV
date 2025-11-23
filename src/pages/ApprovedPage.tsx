import { CheckCircle } from 'lucide-react';

function ApprovedPage() {
  return (
    <div className="min-h-screen bg-green-500 flex items-center justify-center p-6">
      <div className="text-center">
        <CheckCircle className="w-32 h-32 text-white mx-auto mb-8" strokeWidth={2} />
        <h1 className="text-8xl font-bold text-white">
          APPROVED
        </h1>
      </div>
    </div>
  );
}

export default ApprovedPage;
