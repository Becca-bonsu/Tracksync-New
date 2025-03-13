import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({ email: '', password: '', userType: 'lecturer' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      // Navigate based on user type
      if (formData.userType === 'lecturer') {
        navigate('/dashboard');
      } else {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-500 mb-2">Please enter your details</p>
      
      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, userType: 'lecturer' }))}
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
            onClick={() => setFormData(prev => ({ ...prev, userType: 'admin' }))}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
              formData.userType === 'admin'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            HR Admin
          </button>
        </div>

        <div>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Email address"
            required
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Password"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-600">Remember for 30 days</span>
        </label>
        <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
          Forgot password
        </a>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>

      <button
        type="button"
        className="w-full py-3 px-4 bg-white border border-gray-200 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50"
      >
        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        </svg>
        <span className="text-gray-600">Sign in with Google</span>
      </button>
    </form>
  );
}

export default LoginForm;