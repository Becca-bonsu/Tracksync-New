import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessModal from './SuccessModal';

function UniversalLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default to student
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [nextRoute, setNextRoute] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials for testing
    const validCredentials = {
      superadmin: { email: 'superadmin@tracksync.com', password: 'superadmin123' },
      administrator: { email: 'administrator@tracksync.com', password: 'administrator123' },
      hrAdmin: { email: 'hradmin@tracksync.com', password: 'hradmin123' },
      lecturer: { email: 'lecturer@tracksync.com', password: 'lecturer123' },
      nationalServicepersonal: { email: 'nsp@tracksync.com', password: 'nsp123'},
      student: { email: 'student@tracksync.com', password: 'student123' },
    };

    const userCredentials = validCredentials[userType];

    if (!userCredentials) {
      alert('Invalid user type selected. Please try again.');
      return;
    }

    if (email === userCredentials.email && password === userCredentials.password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', userType);

      // Set the next route based on user type
      let nextRoute;
      switch (userType) {
        case 'administrator':
          nextRoute = '/administrator-dashboard';
          break;
        case 'hrAdmin':
          nextRoute = '/hr-admin-dashboard';
          break;
        case 'lecturer':
          nextRoute = '/lecturer-dashboard';
          break;
        case 'student':
          nextRoute = '/student-dashboard';
          break;
        case 'nationalServicepersonal':
          nextRoute = '/nsp-dashboard';
          break;
        default:
          nextRoute = '/dashboard';
      }

      setNextRoute(nextRoute);
      setShowSuccessModal(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate(nextRoute);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Universal Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">User Type</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="administrator">Administrator</option>
                <option value="hrAdmin">HR Admin</option>
                <option value="lecturer">Lecturer</option>
                <option value="nationalServicepersonal">NSP</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <SuccessModal 
        isOpen={showSuccessModal} 
        onRequestClose={handleModalClose}
      />
    </>
  );
}

export default UniversalLogin;
