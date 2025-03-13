import { useState } from 'react';
import { 
  UserGroupIcon, 
  UserIcon, 
  AcademicCapIcon, 
  BookOpenIcon,
  ClipboardDocumentListIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardOverview from '../SuperAdmin/DashboardOverview';
import AdminManagement from '../SuperAdmin/AdminManagement';
import ProgramsAndCourses from '../SuperAdmin/ProgramsAndCourses';
import VisitorLogs from '../VisitorLogs';
import LecturerManagement from './LecturerManagement';

function SuperAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentComponent, setCurrentComponent] = useState('overview');

  const renderComponent = () => {
    switch (currentComponent) {
      case 'admins':
        return <AdminManagement />;
      case 'programs':
        return <ProgramsAndCourses />;
      case 'visitors':
        return <VisitorLogs />;
      case 'lecturers':
        return <LecturerManagement />;
      case 'overview':
      default:
        return <DashboardOverview />;
    }
  };

  const navigation = [
    { name: 'Dashboard Overview', icon: ClipboardDocumentListIcon, component: 'overview' },
    { name: 'Admin Management', icon: UserGroupIcon, component: 'admins' },
    { name: 'Programs & Courses', icon: AcademicCapIcon, component: 'programs' },
    { name: 'Visitor Logs', icon: BookOpenIcon, component: 'visitors' },
    { name: 'Lecturer Management', icon: BriefcaseIcon, component: 'lecturers' },
    { name: 'Employee Management', href: '/super-admin/employees', icon: UserIcon },
    { name: 'Student Management', href: '/super-admin/students', icon: BookOpenIcon },
    { name: 'System Settings', href: '/super-admin/settings', icon: Cog8ToothIcon },
  ];

  const handleLogout = () => {
    // Implement logout logic
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
              <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
              <span className="ml-2 text-white font-semibold text-lg">TrackSync</span>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setCurrentComponent(item.component);
                      setSidebarOpen(false);
                    }}
                    className={`${
                      currentComponent === item.component
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-300"
                      aria-hidden="true"
                    />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
              <button
                onClick={handleLogout}
                className="flex-shrink-0 w-full group block"
              >
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Super Admin</p>
                    <div className="flex items-center text-sm text-gray-400 group-hover:text-gray-300">
                      <ArrowRightOnRectangleIcon className="mr-1 h-4 w-4" />
                      Sign out
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } fixed inset-0 flex z-40 md:hidden`} 
        role="dialog" 
        aria-modal="true"
      >
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75" 
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
              <span className="ml-2 text-white font-semibold text-lg">TrackSync</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setCurrentComponent(item.component);
                    setSidebarOpen(false);
                  }}
                  className={`${
                    currentComponent === item.component
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                >
                  <item.icon
                    className="mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-300"
                    aria-hidden="true"
                  />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
            <button className="flex-shrink-0 group block" onClick={handleLogout}>
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-white">Super Admin</p>
                  <div className="flex items-center text-sm text-gray-400 group-hover:text-gray-300">
                    <ArrowRightOnRectangleIcon className="mr-1 h-4 w-4" />
                    Sign out
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                {navigation.find(item => item.component === currentComponent)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown */}
              {/* Add notifications, profile menu, etc. here */}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-100">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {renderComponent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;