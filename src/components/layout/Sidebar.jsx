import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  ClipboardDocumentIcon,
  UserGroupIcon,
  TrashIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { name: 'My Class List', icon: UserGroupIcon, path: '/class-list' },
    {
      name: 'Course Registration',
      icon: ClipboardDocumentIcon,
      path: '/course-registration',
      subItems: [
        { name: 'Regular', path: '/course-registration/regular' },
        { name: 'Evening', path: '/course-registration/evening' },
        { name: 'Weekends', path: '/course-registration/weekends' },
      ]
    },
    { name: 'Delete Course', icon: TrashIcon, path: '/delete-course' },
  ];

  const isActive = (path) => {
    if (path === '/class-list') {
      return location.pathname.startsWith('/class-list');
    }
    return location.pathname === path;
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">TrackSync</h1>
      </div>
      
      <nav className="flex-1 mt-6 px-4">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-2">
            {item.subItems ? (
              <div>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ease-in-out
                    ${isActive(item.path) 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <item.icon className="w-5 h-5 mr-3 transition-transform duration-200" />
                  <span className="flex-1 text-left font-medium">{item.name}</span>
                  <ChevronDownIcon 
                    className={`w-4 h-4 transition-transform duration-200 
                      ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ease-in-out
                  ${isDropdownOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-11 mt-2 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className={`block py-2 px-3 rounded-md text-sm transition-all duration-200
                          ${isActive(subItem.path)
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out group
                  ${isActive(item.path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <item.icon className={`w-5 h-5 mr-3 transition-transform duration-200 
                  ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="bottom-0 w-full border-t border-gray-200">
        <Link
          to="/settings"
          className="flex items-center p-4 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
        >
          <Cog6ToothIcon className="w-5 h-5 mr-3" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
