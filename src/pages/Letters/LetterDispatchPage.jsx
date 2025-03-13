import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import LetterDispatchForm from '../../components/letters/LetterDispatchForm';

function LetterDispatchPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      console.log('Dispatch Letter Details:', values);
      // Add your submission logic here when backend is ready
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dispatch Letter</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <LetterDispatchForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default LetterDispatchPage;
