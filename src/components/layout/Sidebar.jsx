import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  BookOpenIcon,
  QrCodeIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const userType = localStorage.getItem('userType');
  const navigate = useNavigate();

  const getMenuItems = () => {
    switch (userType) {
      case 'student':
        return [
          { name: 'Dashboard', icon: HomeIcon, path: '/student-dashboard' },
          { name: 'Personal Details', icon: UserIcon, path: '/student-dashboard/profile' },
        ];
      case 'lecturer':
        return [
          { name: 'Dashboard', icon: HomeIcon, path: '/lecturer-dashboard' },
          { name: 'My Class List', icon: UserGroupIcon, path: '/class-list' },
          { name: 'Take Attendance', icon: QrCodeIcon, path: '/take-attendance' },
        ];
      default:
        return [
          { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
        ];
    }
  };

  const menuItems = getMenuItems();

  const isActive = (path) => {
    if (path === '/class-list') {
      return location.pathname.startsWith('/class-list');
    }
    return location.pathname === path;
  };

  const viewDetails = () => {
    alert(`Navigating to course details for course ID: ${course.id}`);
    // Uncomment the next line to enable navigation after testing
    // navigate(`/student-dashboard/courses/${course.id}`);
  };

  return (
    <aside className="w-64 min-h-screen bg-blue-800 border-r border-grey-200 shadow-sm transition-all duration-300 ease-in-out flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-white">TrackSync</h1>
      </div>
      
      <nav className="flex-1 mt-6 px-4">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-2">
            <Link
              to={item.path}
              className={`flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out group
                ${isActive(item.path)
                  ? 'bg-blue-50 text-white'
                  : 'text-white hover:bg-gray-800'}`}
            >
              <item.icon className={`w-5 h-5 mr-3 transition-transform duration-200 
                ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          </div>
        ))}
      </nav>

      <div className="bottom-0 w-full border-t border-gray-200">
        <Link
          to="/settings"
          className="flex items-center p-4 text-white hover:bg-gray-800 transition-colors duration-200"
        >
          <Cog6ToothIcon className="w-5 h-5 mr-3" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
