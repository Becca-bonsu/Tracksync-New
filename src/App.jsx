import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VisitorPage from './pages/VisitorPage';
import LecturerDashboard from './pages/LecturerDashboard';
import AdministratorDashboard from './components/SuperAdmin/AdministratorDashboard';
import ClassListPage from './pages/ClassListPage';
import ClassList from './components/class/ClassList';
import IncomingLetterPage from './pages/Letters/IncomingLetterPage';
import AttendancePage from './pages/AttendancePage';
import PublicVisitorForm from './pages/PublicVisitorForm';
import QRCodePage from './pages/QRCodePage';
import ScanAttendance from './components/attendance/ScanAttendance';
import IndividualClassListPage from './pages/IndividualClassListPage';
import EmployeeRegistration from './pages/EmployeeRegistration';
import DashboardOverview from './components/SuperAdmin/DashboardOverview';
import AdminManagement from './components/SuperAdmin/AdminManagement';
import ProgramsAndCourses from './components/SuperAdmin/ProgramsAndCourses';
import VisitorLogs from './components/VisitorLogs';
import ProtectedRoute from './components/ProtectedRoute';
import UnifiedDashboard from './components/UnifiedDashboard';
import UniversalLogin from './components/UniversalLogin';
import TakeAttendancePage from './pages/TakeAttendancePage';
import TickAttendance from './components/attendance/TickAttendance';
import HrAdminDashboard from './pages/HrAdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CourseDetails from './pages/CourseDetails';

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

  const ProtectedRouteComponent = ({ children, allowedUserType }) => {
    if (isLoading) {
      return null;
    }

    if (!auth.isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (allowedUserType && auth.userType.toLowerCase() !== allowedUserType.toLowerCase()) {
      return <Navigate to="/dashboard" replace />;
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
            <UniversalLogin />
          } 
        />
        <Route path="/signup" element={<Signup />} />
        
        {/* Lecturer Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRouteComponent>
              <UnifiedDashboard userRole={auth.userType} />
            </ProtectedRouteComponent>
          }
        />
        <Route
          path="/class-list"
          element={
            <ProtectedRouteComponent allowedUserType="lecturer">
              <ClassListPage />
            </ProtectedRouteComponent>
          }
        />
        <Route
          path="/class-list/:courseId"
          element={
            <ProtectedRouteComponent allowedUserType="lecturer">
              <IndividualClassListPage />
            </ProtectedRouteComponent>
          }
        />
        <Route
          path="/lecturer-dashboard"
          element={
            <ProtectedRouteComponent allowedUserType="lecturer">
              <LecturerDashboard />
            </ProtectedRouteComponent>
          }
        />
        
        {/* Admin Routes
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRouteComponent allowedUserType="admin">
              <AdminDashboard />
            </ProtectedRouteComponent>
          }
        /> */}
        <Route
          path="/hr-admin-dashboard/employee-registration"
          element={
            <ProtectedRouteComponent allowedUserType="HrAdmin">
              <EmployeeRegistration />
            </ProtectedRouteComponent>
          }
        />
        
        {/* Shared Routes */}
        <Route path="/scan-attendance" element={<ScanAttendance />} />
        <Route path="/scan-attendance/:courseId" element={<ScanAttendance />} />
        <Route path="/tick-attendance/:courseId" element={<TickAttendance />} />
        <Route path="/visitor-registration" element={<PublicVisitorForm />} />
        <Route
          path="/visitor"
          element={
            <ProtectedRouteComponent>
              <VisitorPage />
            </ProtectedRouteComponent>
          }
        />
        <Route
          path="/qr-code"
          element={
            <ProtectedRouteComponent>
              <QRCodePage />
            </ProtectedRouteComponent>
          }
        />
        <Route
          path="/attendance/:courseId"
          element={
            <ProtectedRouteComponent>
              <AttendancePage />
            </ProtectedRouteComponent>
          }
        />
        
        {/* Super Admin Routes
        <Route path="/super-admin/login" element={<SuperAdminLogin />} /> */}
        {/* <Route 
          path="/super-admin/dashboard" 
          element={
            <ProtectedRouteComponent allowedUserType="administrator">
              <AdministratorDashboard />
            </ProtectedRouteComponent>
          } 
        /> */}
        <Route
          path="/super-admin/*"
          element={
            <ProtectedRouteComponent allowedUserType="administrator">
              <AdministratorDashboard />
            </ProtectedRouteComponent>
          }
        />
        <Route 
          path="/visitor-logs" 
          element={
            <ProtectedRouteComponent allowedUserType="administrator">
              <VisitorLogs />
            </ProtectedRouteComponent>
          } 
        />
        
        {/* Take Attendance Route */}
        <Route
          path="/take-attendance"
          element={
            <ProtectedRouteComponent>
              <TakeAttendancePage />
            </ProtectedRouteComponent>
          }
        />
        
        {/* Hr Admin Routes */}
        <Route
          path="/hr-admin-dashboard"
          element={
            <ProtectedRouteComponent allowedUserType="hrAdmin">
              <HrAdminDashboard />
            </ProtectedRouteComponent>
          }
        />
        
        {/* Administrator Dashboard Route */}
        <Route
          path="/administrator-dashboard/*"
          element={
            <ProtectedRouteComponent allowedUserType="administrator">
              <AdministratorDashboard />
            </ProtectedRouteComponent>
          }
        />
        
        {/* Student Routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRouteComponent allowedUserType="student">
              <StudentDashboard />
            </ProtectedRouteComponent>
          }
        />
        <Route
          path="/student-dashboard/courses/:courseId"
          element={
            <ProtectedRouteComponent allowedUserType="student">
              <CourseDetails />
            </ProtectedRouteComponent>
          }
        />
        
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