import { useState } from 'react';
import IncomingLetterForm from '../../components/Letters/IncomingLetterForm';
import DashboardLayout from '../../components/layout/DashboardLayout';

function IncomingLetterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      console.log('Form values:', values);
      // Add your submission logic here
      // e.g., API call to save the letter
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Record Incoming Letter</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <IncomingLetterForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default IncomingLetterPage;
