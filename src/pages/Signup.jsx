import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import { CubeTransparentIcon } from '@heroicons/react/24/solid';

function Signup() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (values) => {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 text-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center space-x-2 mb-8">
          <CubeTransparentIcon className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-semibold ">TrackSync</span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
        <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
        
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;