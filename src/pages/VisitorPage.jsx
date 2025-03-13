import { useState } from 'react';
import VisitorForm from '../components/VisitorForm';
import { CubeTransparentIcon } from '@heroicons/react/24/solid';

function VisitorPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      console.log(values);
      // Add your submission logic here
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center space-x-2 mb-8">
          <CubeTransparentIcon className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold">TrackSync</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Visitor Registration</h2>
        <VisitorForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default VisitorPage;