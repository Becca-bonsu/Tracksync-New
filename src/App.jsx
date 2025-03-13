import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VisitorPage from './pages/VisitorPage';
import LecturerDashboard from './pages/LecturerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ClassListPage from './pages/ClassListPage';
import ClassList from './components/class/ClassList';
import IncomingLetterPage from './pages/Letters/IncomingLetterPage';
import AttendancePage from './pages/AttendancePage';
import PublicVisitorForm from './pages/PublicVisitorForm';
import QRCodePage from './pages/QRCodePage';
import ScanAttendance from './components/attendance/ScanAttendance';
import IndividualClassListPage from './pages/IndividualClassListPage';
import EmployeeRegistration from './pages/EmployeeRegistration';
import SuperAdminDashboard from './components/SuperAdmin/SuperAdminDashboard';
import SuperAdminLogin from './components/SuperAdmin/SuperAdminLogin';
import DashboardOverview from './components/SuperAdmin/DashboardOverview';
import AdminManagement from './components/SuperAdmin/AdminManagement';
import ProgramsAndCourses from './components/SuperAdmin/ProgramsAndCourses';
import VisitorLogs from './components/VisitorLogs';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    userType: null
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userType = localStorage.getItem('userType');
    
    setAuth({
      isAuthenticated,
      userType
    });
    setIsLoading(false);
  }, []);

  const ProtectedRoute = ({ children, allowedUserType }) => {
    if (isLoading) {
      return null;
    }

    if (!auth.isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (allowedUserType && auth.userType !== allowedUserType) {
      return <Navigate to={auth.userType === 'admin' ? '/admin-dashboard' : '/dashboard'} replace />;
    }

    return children;
  };

  if (isLoading) {
    return null;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            <Login setAuth={setAuth} />

            // auth.isAuthenticated ? (
            //   <Navigate to={auth.userType === 'admin' ? '/admin-dashboard' : '/login'} replace />
            // ) : (
            //   <Login setAuth={setAuth} />
            // )
          } 
        />
        <Route path="/signup" element={<Signup />} />
        
        {/* Lecturer Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedUserType="lecturer">
              <LecturerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/class-list"
          element={
            <ProtectedRoute allowedUserType="lecturer">
              <ClassListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/class-list/:courseId"
          element={
            <ProtectedRoute allowedUserType="lecturer">
              <IndividualClassListPage />
            </ProtectedRoute>
          }
        />
        
        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedUserType="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/employee-registration"
          element={
            <ProtectedRoute allowedUserType="admin">
              <EmployeeRegistration />
            </ProtectedRoute>
          }
        />
        
        {/* Shared Routes */}
        <Route path="/scan-attendance" element={<ScanAttendance />} />
        <Route path="/visitor-registration" element={<PublicVisitorForm />} />
        <Route
          path="/visitor"
          element={
            <ProtectedRoute>
              <VisitorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qr-code"
          element={
            <ProtectedRoute>
              <QRCodePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <AttendancePage />
            </ProtectedRoute>
          }
        />
        
        {/* Super Admin Routes */}
        <Route path="/super-admin/login" element={<SuperAdminLogin />} />
        <Route 
          path="/super-admin/dashboard" 
          element={
            <ProtectedRoute allowedUserType="superadmin">
              <SuperAdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/super-admin" element={<DashboardOverview />} />
        <Route path="/super-admin/admins" element={<AdminManagement />} />
        <Route path="/super-admin/programs" element={<ProgramsAndCourses />} />
        
        {/* Visitor Logs */}
        <Route path="/visitor-logs" element={<VisitorLogs />} />
        
        {/* Default route */}
        <Route 
          path="*" 
          element={<Navigate to="/login" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;