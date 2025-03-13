import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/admin/EmployeeForm';

function EmployeeRegistration() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);

    try {
      // Here you would typically make an API call to register the employee
      const response = await fetch('/api/employees/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          department: values.department,
          role: values.role,
          status: 'Active', // Default status for new employees
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to register employee');
      }

      // If successful, redirect to the employees list
      navigate('/admin-dashboard/employees');
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to be handled by the form's error handling
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {error && (
          <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-md">
            {error}
          </div>
        )}
        
        <EmployeeForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default EmployeeRegistration; 