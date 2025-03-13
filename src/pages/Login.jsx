import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CubeTransparentIcon } from '@heroicons/react/24/solid';

function Login({ setAuth }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'lecturer'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUserTypeChange = (type) => {
    setFormData(prevData => ({
      ...prevData,
      userType: type
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Clear any existing auth data
      localStorage.clear();
      
      // Simulated credentials check
      const validCredentials = {
        lecturer: { email: 'lecturer@tracksync.com', password: 'lecturer123' },
        admin: { email: 'admin@tracksync.com', password: 'admin123' }
      };

      const userCredentials = validCredentials[formData.userType];
      
      if (formData.email === userCredentials.email && formData.password === userCredentials.password) {
        // Store auth state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', formData.userType);
        localStorage.setItem('user', JSON.stringify({ email: formData.email }));
        
        // Update auth context
        setAuth({
          isAuthenticated: true,
          userType: formData.userType
        });
        
        // Navigate based on user type
        const redirectPath = formData.userType === 'admin' ? '/admin-dashboard' : '/dashboard';
        navigate(redirectPath, { replace: true });
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <CubeTransparentIcon className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to TrackSync
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {formData.userType === 'lecturer' ? (
              <>Use lecturer@tracksync.com / lecturer123</>
            ) : (
              <>Use admin@tracksync.com / admin123</>
            )}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              onClick={() => handleUserTypeChange('lecturer')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                formData.userType === 'lecturer'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Lecturer
            </button>
            <button
              type="button"
              onClick={() => handleUserTypeChange('admin')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                formData.userType === 'admin'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              HR Admin
            </button>
          </div>
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;