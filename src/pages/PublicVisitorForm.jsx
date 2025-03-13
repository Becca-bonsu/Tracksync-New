import { useState } from 'react';
import VisitorForm from '../components/VisitorForm';

function PublicVisitorForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      // Add your submission logic here
      console.log('Form values:', values);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
            >
              <circle
                className="opacity-25"
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M14 24l8 8 16-16"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Registration Successful
          </h2>
          <p className="text-gray-500">
            Thank you for registering. Please proceed to the reception.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center space-x-2 mb-8">
          <span className="text-xl font-bold">Visitor Registration</span>
        </div>
        <VisitorForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default PublicVisitorForm;
